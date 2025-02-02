import { useEffect, useState } from "react"
import Chat from "./Chat"

function IndexSidePanel() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const messageListener = (message) => {
      console.log("Received message:", message) // Log the entire message

      const { type, text } = message || {}
      if (type === "save-text-content") {
        console.log("Information document_clauses", text)
      }

      if (type) { // Ensure type is defined
        setMessages(prevMessages => [...prevMessages, { type, text }])
        console.log("Updated messages:", [...messages, { type, text }]) // Log updated messages
      }

      return true
    }

    chrome.runtime.onMessage.addListener(messageListener)
    console.log("Listener added") // Confirm listener is added

    return () => {
      chrome.runtime.onMessage.removeListener(messageListener)
      console.log("Listener removed") // Confirm listener is removed
    }
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
