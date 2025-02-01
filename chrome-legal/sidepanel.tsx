import Chat from "./Chat"

function IndexSidePanel() {
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
