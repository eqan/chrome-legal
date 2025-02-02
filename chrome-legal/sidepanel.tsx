import { useEffect, useState } from "react"
import Chat from "./Chat"
import { GlobalProvider, useGlobalContext } from "./GlobalContext"

function SidePanelContent() {
  const { setGlobalState } = useGlobalContext()

  useEffect(() => {
    const messageListener = (message) => {
      console.log("Received message:", message) // Log the entire message

      const { type, text, url } = message || {}
      if (type === "save-text-content") {
        console.log("Information document_clauses", text)
        setGlobalState({ text, url })
        console.log("Updated messages:", message) // Log updated messages
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

function IndexSidePanel() {
  return (
    <GlobalProvider>
      <SidePanelContent />
    </GlobalProvider>
  );
}

export default IndexSidePanel;
