import "./App.css"
import io from "socket.io-client"
import { useState } from "react"
import Chat from "./Chat"

const socket = io.connect("http://localhost:3001")

function App() {
  const [username, SetUsername] = useState("")
  const [room, setRoom] = useState("")
  const [showChat, SetShowChat] = useState(false)

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room)
      SetShowChat(true)
    }
  }

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer" >
          <h3>Join A Chat</h3>
          <input type="text" placeholder="Krushna ..."
            onChange={(event) => {
              SetUsername(event.target.value)
            }} />
          <input type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value)
            }} />
          <button onClick={joinRoom}>Join the Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  )
}

export default App;