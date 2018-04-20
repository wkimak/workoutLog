import React, {Component} from 'react';
import socketClient from 'socket.io-client';
import axios from 'axios';
import moment from 'moment';

/* ----- Level 2 ----- */

class Chat extends Component {
	constructor(props) {
		super(props);
    this.state = {
      inputVal: '',
      messages: [],
      isTyping: ''
    }

    this.handleInput = this.handleInput.bind(this);
    this.emitMessage = this.emitMessage.bind(this);
    this.addMessage = this.addMessage.bind(this);
    this.getChatHistory = this.getChatHistory.bind(this);
    this.handleBroadcast = this.handleBroadcast.bind(this);
    this.handleTyping = this.handleTyping.bind(this);

    this.socket = socketClient();
    this.socket.on('chat message', (msg, username, time) => {
      this.addMessage(msg, username, time);
    })

    this.socket.on('typing', (username) => {
      this.handleBroadcast(username);
    })
	}


  // get previous chat messages from server
  getChatHistory() {
    axios.get('/chat')
    .then((data) => {
      data.data.map((msg) => {
      this.state.messages.push({message: msg.message, username: msg.username, time: moment(msg.created_at).fromNow() });
      })
      this.setState(this.state);
    })
    .catch((err) => {
      console.log('GET request failed for /chat', err);
    })
  }
  
  // render chat history on mount
  componentDidMount() {
    this.getChatHistory();
  }


  // set input value state
  handleInput(e) {
    this.setState({
      inputVal: e.target.value
    })
  }

  // Add submitted message to messages array
  addMessage(msg, username, time) {
    this.setState({ messages: [...this.state.messages, {message: msg, username: username, time: time }], isTyping: '' })
  }
 
  // send message to server
  emitMessage(e) {
    e.preventDefault();
    let time = new Date();
    this.socket.emit('chat message', this.state.inputVal, this.props.username, time);
    this.setState({ inputVal: '', isTyping: '' });
  }
   
  handleBroadcast(username) {
    this.setState({ isTyping: username + ' is typing...' });
  }

  // send username of user who is typing to server
  handleTyping() {
    this.socket.emit('typing', this.props.username);
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
              <div className='row'> {this.state.isTyping} </div>
              <div className='row'>
                <form onSubmit={ (e) => this.emitMessage(e)}>
                  <input  onKeyPress={ () => this.handleTyping() } value={ this.state.inputVal } onChange={ (e) => this.handleInput(e) } className='browser-default message_input col s8' type='text' placeholder='Message' />
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