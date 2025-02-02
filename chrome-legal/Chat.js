import React, { Component } from 'react'
import ChatInput from './ChatInput'
import ChatMessage from './ChatMessage'
import './index.css'

const URL = 'ws://localhost:8000/ws'

class Chat extends Component {
  state = {
    name: 'User',
    messages: [],
    document_clauses: '',
    document_link: '',
    user_id: 1,
  }

  ws = new WebSocket(URL)

  componentDidMount() {
    this.ws.onopen = () => {
      console.log('connected')
    }


    this.ws.onmessage = evt => {
      const message = JSON.parse(evt.data)
      this.addMessage(message)
    }

    this.ws.onclose = () => {
      console.log('disconnected')
      this.setState({
        ws: new WebSocket(URL),
      })
    }
  }

  addMessage = message =>
    this.setState(state => ({ messages: [message, ...state.messages] }))

  submitMessage = async messageString => {
    // Function to get selected text or entire page content
    const document_clauses = "";
    console.log("document_clauses", document_clauses);

    const message = {
      name: this.state.name,
      message: messageString,
      document_clauses: document_clauses,
      document_link: this.state.document_link,
      user_id: this.state.user_id,
      chat_history: this.state.messages.toString()
    };

    this.ws.send(JSON.stringify(message));
    this.addMessage(message);
  }

  render() {
    return (
      <div>
        <div className="fixed-chat">
          <div className="panel-chat">
            <div className="body-chat">
              {this.state.messages.slice(0).reverse().map((message, index) =>
                <ChatMessage
                  key={index}
                  message={message.message}
                  name={message.name}
                />,
              )}
            </div>
            <div className="message-chat">
              <ChatInput
                ws={this.ws}
                onSubmitMessage={messageString => this.submitMessage(messageString)}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Chat
