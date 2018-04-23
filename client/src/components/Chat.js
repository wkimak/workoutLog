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
      activeUsers: [],
      roomUpdate: '',
      currentRoom: 'public',
      openChats: [],
    }

    this.handleInput = this.handleInput.bind(this);
    this.emitMessage = this.emitMessage.bind(this);
    this.getChatHistory = this.getChatHistory.bind(this);

    this.switchRooms = this.switchRoom.bind(this);

   /* -------- Sockets ------- */
    this.socket = socketClient();

    this.socket.on('updateusers', (res, username) => {
      this.setState({ roomUpdate: res });

      if(username) {
        this.setState({ activeUsers: [...this.state.activeUsers, username]})
      }
    })


    this.socket.on('deleteusers', (username) => {
      let spliced = this.state.activeUsers.splice(this.state.activeUsers.indexOf(username), 1);
      this.setState({ activeUsers: spliced });
    })


    this.socket.on('get users', (users) => {
      let copy = [];
      for(var key in users) {
        if(users[key] !== this.props.username) {
          copy.push(users[key]);
        }
      }

      this.setState({ activeUsers: [...this.state.activeUsers, ...copy] })
    })


    this.socket.on('updatechat', (username, msg, time) => {
      if(username && msg && time) { 
        this.setState({ messages: [...this.state.messages, { username: username, message: msg, time: time }]});
      } else {
        this.setState({messages: [...this.state.messages, { username: username, message: null, time: null }]});
      }
    })


    this.socket.on('updaterooms', (rooms, currentRoom) => {

      this.setState({currentRoom : currentRoom});

      rooms.forEach((room, index) => {
        if(!this.state.openChats.includes(room)){
          this.setState({ openChats: [...this.state.openChats, room] });
        }

        if(room === currentRoom) {
          this.setState({ currentRoom: room })
        } 
      })
    })

  }


    
  //Switching Rooms
  switchRoom(usr) {
    this.getChatHistory();
    this.socket.emit('switch room', usr, this.props.username);
    this.setState({ messages: [{username: null, message: null, time: null }]});
  }



  // get previous chat messages from server
  getChatHistory() {
   
    axios.get('/chat', {params: {room: this.state.currentRoom} })
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
    this.socket.emit('add user', this.props.username);  
    this.socket.emit('get users');
  }


  // set input value state
  handleInput(e) {
    this.setState({
      inputVal: e.target.value
    })
  }

 
  // send message to server
  emitMessage(e) {
    e.preventDefault();
    let time = new Date();
   
    this.socket.emit('chat message', this.state.inputVal, time);
    this.setState({ inputVal: '' });
  }
   


	render() {
		return(
      <div className ='container'>
        <div className='row'>
          <div className='col s8'>
            <div className='card darken-1'>
              <div className='card-content'>
                <ChatMessages currentRoom={ this.state.currentRoom } roomUpdate={ this.state.roomUpdate } isPrivate={ this.state.isPrivate } messages={ this.state.messages } />
              
              <div className='row'> {this.state.isTyping} </div>
              
              <div className='row'>
                <form onSubmit={ (e) => this.emitMessage(e)}>
                  <input  value={ this.state.inputVal } onChange={ (e) => this.handleInput(e) } className='browser-default message_input col s8' type='text' placeholder='Message' required />
                  <button type='submit' className="btn col s2 offset-s1">Send</button>
                </form>  
              </div>
            </div>
          </div>
        </div>
          <ActiveUsers currentRoom={ this.state.currentRoom } switchRooms={ this.switchRooms } openChats={ this.state.openChats } activeUsers={ this.state.activeUsers } />
        </div>
      </div>
        
     
		);
	}
}

export default Chat;