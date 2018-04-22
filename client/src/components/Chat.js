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
      publicMessages: [],
      privateMessages: [],
      isTyping: '',
      activeUsers: [],
      isPrivate: false,
      currentRoom: ''
    }

    this.handleInput = this.handleInput.bind(this);
    this.emitMessage = this.emitMessage.bind(this);
    this.addMessage = this.addMessage.bind(this);
    this.getChatHistory = this.getChatHistory.bind(this);
    this.handleBroadcast = this.handleBroadcast.bind(this);
    this.handleTyping = this.handleTyping.bind(this);
    this.privateRoom = this.privateRoom.bind(this);

   /* -------- Sockets ------- */
    this.publicSocket = socketClient({ query: { username: this.props.username }});
    this.privateSocket = socketClient('/privateSocket', { query: { username: this.props.username }});


    // Socket event handlers
    this.publicSocket.on('chat message', (msg, username, time) => {
      this.addMessage(msg, username, time, 'publicMessages');
    })

    this.publicSocket.on('typing', (username) => {
      this.handleBroadcast(username);
    })

    this.publicSocket.on('getUsers', (usersArray) => {
      console.log('GETUSERS', usersArray);
      this.setState({ activeUsers: usersArray })
    })

    this.publicSocket.on('disconnectUser', (usersArray) => {
     console.log('disconnect');
      this.setState({ activeUsers: usersArray });
    })

   this.privateSocket.on('chat message', (msg, username, time) => {
     this.addMessage(msg, username, time, 'privateMessages');
   })

   this.publicSocket.on('typing', (username) => {
      this.handleBroadcast(username);
    })
  }






  // get previous chat messages from server
  getChatHistory() {
    axios.get('/chat')
    .then((data) => {
      data.data.map((msg) => {
      this.state.publicMessages.push({message: msg.message, username: msg.username, time: moment(msg.created_at).fromNow() });
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
    this.publicSocket.emit('getUsers');
   // this.socket.emit('activeUsers', this.props.username);
  }

  componentWillUnmount() {
    console.log('UNMOUNTED!');
    this.publicSocket.emit('disconnectUser');
  }


  // set input value state
  handleInput(e) {
    this.setState({
      inputVal: e.target.value
    })
  }

  // Add submitted message to messages array
  addMessage(msg, username, time, messageType) {
    if(!this.state.isPrivate){
      this.setState({ publicMessages: [...this.state.publicMessages, {message: msg, username: username, time: time }], isTyping: '' })
    } else {
      this.setState({privateMessages: [...this.state.privateMessages, {message: msg, username: username, time: time}]});
    }
  }
 
  // send message to server
  emitMessage(e) {
    e.preventDefault();
    let time = new Date();
    if(this.state.isPrivate === false) {
      this.publicSocket.emit('chat message', this.state.inputVal, this.props.username, time);
    } else {
      this.privateSocket.emit('chat message', this.state.inputVal, this.props.username, time);
    }

    this.setState({ inputVal: '', isTyping: '' });
  }
   
  handleBroadcast(username) {
    this.setState({ isTyping: username + ' is typing...' });
  }

  // send username of user who is typing to server
  handleTyping() {
    if(!this.state.isPrivate) {
      this.publicSocket.emit('typing', this.props.username);
    } else {
      this.privateSocket.emit('typing', this.props.username);
    }
  }


  // enter into private room with selected user
  privateRoom(room) {
    this.setState({ isPrivate: true, currentRoom: room })
  }



	render() {
    console.log(this.state.activeUsers);
		return(
      <div className ='container'>
        <div className='row'>
          <div className='col s8'>
            <div className='card darken-1'>
              <div className='card-content'>
                <ChatMessages currentRoom={ this.state.currentRoom } isPrivate={ this.state.isPrivate } privateMessages={ this.state.privateMessages } publicMessages={ this.state.publicMessages } />
              
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
          <ActiveUsers privateRoom={ this.privateRoom } activeUsers={ this.state.activeUsers } />
        </div>
      </div>
        
     
		);
	}
}

export default Chat;