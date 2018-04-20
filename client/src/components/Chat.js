import React, {Component} from 'react';
import socketClient from 'socket.io-client';
import axios from 'axios';

/* ----- Level 2 ----- */

class Chat extends Component {
	constructor(props) {
		super(props);
    this.state = {
      inputVal: '',
      messages: []
    }

    this.handleInput = this.handleInput.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.addMessage = this.addMessage.bind(this);
    this.getChatHistory = this.getChatHistory.bind(this);

    this.socket = socketClient();
    this.socket.on('chat message', (msg, username, time) => {
      this.addMessage(msg, username, time);
    })
	}


  // get previous chat messages from server
  getChatHistory() {
    axios.get('/chat')
    .then((data) => {
      console.log(data);
      data.data.map((msg) => {
      this.state.messages.push({message: msg.message, username: msg.username, time: msg.created_at});
      })
      this.setState(this.state);
    })
    .catch((err) => {
      console.log('GET request failed for /chat', err);
    })
  }

  componentDidMount() {
    this.getChatHistory();
  }

  addMessage(msg, username, time) {
    this.setState({ messages: [...this.state.messages, {message: msg, username: username, time: time }]})
  }
 

  handleInput(e) {
    this.setState({
      inputVal: e.target.value
    })
  }

  sendMessage(e) {
    e.preventDefault();
    let time = new Date();
    this.socket.emit('chat message', this.state.inputVal, this.props.username, time);
    this.setState({ inputVal: '' })
  }

	render() {
		return(
      <div className='container'>
        <div className='row'>
          <div className='card darken-1'>
            <div className='card-content'>
              <div className='row chat_room'> 
                { this.state.messages.map((msg, i) => {
                    return(
                      <div key={ i } className='row message_container'>
                        <span className='left-align'>{ msg.username }</span>
                        <span className='right'>{ msg.time }</span>
                        <div>{ msg.message }</div>
                      </div>
                    )
                })}
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