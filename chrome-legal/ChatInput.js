import React, { Component } from 'react'

class ChatInput extends Component {
  state = {
    message: '',
  }

  render() {
    return (
      <div>
        <form
          action="."
          onSubmit={e => {
            e.preventDefault()
            this.props.onSubmitMessage(this.state.message)
            this.setState({ message: '' })
          }}
        >
          <input
            type="text"
            placeholder={'Enter message...'}
            value={this.state.message}
            onChange={e => this.setState({ message: e.target.value })}
          />
          <input type="submit" value={'Send'} />
        </form>
      </div>
    )
  }
}

export default ChatInput
