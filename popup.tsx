import * as style from "./popup.module.css"

function IndexPopup() {
  return (
    <div className={style.container}>
      <h2 className={style.title}>go/</h2>
      <p className={style.description}>
        This is a pet project by nkaewam@ inspired by the link management
        reverse proxy "ÜberProxy" used at Google.
      </p>
    </div>
  )
}

export default IndexPopup
