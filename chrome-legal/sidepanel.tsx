import { useEffect } from "react"
import Chat from "./Chat"

function IndexSidePanel() {
  useEffect(() => {
    chrome.runtime.onMessage.addListener(({type, text}) => {
      if (type === "tab-data") {
        console.log("Information document_clauses", text)
      }
      return true
    })
  }, [])

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16
      }}>
      <Chat />
    </div>
  )
}

export default IndexSidePanel
