// Setup redirect rules for golinks
// Using session rules (cleared on extension reload) instead of dynamic rules
async function setupRedirectRules() {
  // Get redirect host from environment variable
  const redirectHost = process.env.PLASMO_PUBLIC_REDIRECT_HOST || ""

  if (!redirectHost) {
    console.error("PLASMO_PUBLIC_REDIRECT_HOST environment variable is not set")
    return
  }

  // Ensure redirectHost doesn't end with / to avoid double slashes
  // The path from go/<path> will be appended with a leading /
  const baseUrl = redirectHost.endsWith("/")
    ? redirectHost.slice(0, -1)
    : redirectHost

  // Get existing session rules and remove them, then add new ones atomically
  const registeredRules = await chrome.declarativeNetRequest.getSessionRules()
  const removeRuleIds = registeredRules.map((rule) => rule.id)

  // Combine remove and add in a single call to avoid race conditions
  // regexFilter matches URLs like http://go/path (HTTP only, not HTTPS)
  // regexSubstitution uses \1 to reference the captured path group
  chrome.declarativeNetRequest.updateSessionRules({
    removeRuleIds: removeRuleIds.length > 0 ? removeRuleIds : undefined,
    addRules: [
      {
        id: 1,
        priority: 1,
        action: {
          type: chrome.declarativeNetRequest.RuleActionType.REDIRECT,
          redirect: {
            regexSubstitution: `${baseUrl}/\\1`
          }
        },
        condition: {
          regexFilter: "^https?://go/(.+)$",
          resourceTypes: [chrome.declarativeNetRequest.ResourceType.MAIN_FRAME]
        }
      }
    ]
  })
}

// Initialize redirect rules when the extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
  setupRedirectRules()
})

// Also setup on startup
chrome.runtime.onStartup.addListener(() => {
  setupRedirectRules()
})
