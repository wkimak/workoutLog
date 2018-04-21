import React, {Component} from 'react';

import ChatMessages from './ChatMessages';
import ActiveUsers from './ActiveUsers';


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
      isTyping: '',
      activeUsers: []
    }

    this.handleInput = this.handleInput.bind(this);
    this.emitMessage = this.emitMessage.bind(this);
    this.addMessage = this.addMessage.bind(this);
    this.getChatHistory = this.getChatHistory.bind(this);
    this.handleBroadcast = this.handleBroadcast.bind(this);
    this.handleTyping = this.handleTyping.bind(this);

   /* -------- Socket ------- */
    this.socket = socketClient("http://127.0.0.1:3000/", { query: { username: this.props.username }});
    this.socket.on('chat message', (msg, username, time) => {
      this.addMessage(msg, username, time);
    })

    this.socket.on('typing', (username) => {
      this.handleBroadcast(username);
    })

    this.socket.on('getUsers', (usersArray) => {
      console.log('GETUSERS', usersArray);
      this.setState({ activeUsers: usersArray })
    })

    this.socket.on('disconnectUser', (usersArray) => {
     console.log('disconnect');
      this.setState({ activeUsers: usersArray });
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
    this.socket.emit('getUsers');
   // this.socket.emit('activeUsers', this.props.username);
  }

  componentWillUnmount() {
    console.log('UNMOUNTED!');
    this.socket.emit('disconnectUser');
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
    console.log(this.state.activeUsers);
		return(
      <div className ='container'>
        <div className='row'>
          <div className='col s8'>
            <div className='card darken-1'>
              <div className='card-content'>
                <ChatMessages messages={ this.state.messages } />
              
              <div className='row'> {this.state.isTyping} </div>
              
              <div className='row'>
                <form onSubmit={ (e) => this.emitMessage(e)}>
                  <input  onKeyPress={ () => this.handleTyping() } value={ this.state.inputVal } onChange={ (e) => this.handleInput(e) } className='browser-default message_input col s8' type='text' placeholder='Message' required />
                  <button type='submit' className="btn col s2 offset-s1">Send</button>
                </form>  
              </div>
            </div>
          </div>
        </div>
          <ActiveUsers activeUsers={ this.state.activeUsers } />
        </div>
      </div>
        
     
		);
	}
}

export default Chat;