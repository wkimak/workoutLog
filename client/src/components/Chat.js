import React, {Component} from 'react';
import socketClient from 'socket.io-client'

/* ----- Level 2 ----- */

class Chat extends Component {
	constructor(props) {
		super(props);
    this.state = {
      inputVal: '',
      messages: ''
    }

    this.handleInput = this.handleInput.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
	}

  handleInput(e) {
    this.setState({
      inputVal: e.target.value
    })
  }

  sendMessage(e) {
    e.preventDefault();
    const socket = socketClient();
    socket.emit('chat message', this.state.inputVal);
  }

	render() {

    const socket = socketClient();

 
    socket.on('chat message', (msg) => {
      this.setState({
        messages: msg
      })

    })

		return(
      <div className='container'>
        <div className='row'>
          <div className='card darken-1'>
            <div className='card-content'>
              <div className='row chat_room'>
                <ul>
                  { this.state.messages }
                </ul>
              </div>
              <div className='row'>
                <form onSubmit={ (e) => this.sendMessage(e)}>
                  <input value={ this.state.inputVal } onChange={ (e) => this.handleInput(e) } className='browser-default message_input col s8' type='text' placeholder='Message' />
                  <button type='submit' className="btn col s2 offset-s1">Send</button>
                </form>  
              </div>
            </div>
          </div>
        </div>
      </div>
		);
	}
}

export default Chat;