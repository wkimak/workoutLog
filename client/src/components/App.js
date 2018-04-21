import React, {Component} from 'react';
import Navbar from './Navbar';
import Log from './Log';
import Chat from './Chat';
import LogIn from './LogIn';
import SignUp from './SignUp';

import axios from 'axios';

import { Route, Switch, Redirect } from 'react-router-dom';


class App extends Component {

  constructor(props) {
  	super(props);

    this.state = {
      username: '',
      logData: []
    }

    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogForm = this.handleLogForm.bind(this);
    this.deleteLog = this.deleteLog.bind(this);
    this.handleViewLogs = this.handleViewLogs.bind(this);
  }

  //POST username/password to server
  handleSignUp(username, password) {
    axios.post('/signup', { username: username, password:password })
    .catch((err) => {
      console.log('POST request failed for /users', err);
    })

    this.setState({
      username: username
    })
  }

  //POST username/password to server
  handleLogin(username, password) {
    axios.post('/signin', { username: username, password: password })
    .then((response) => {
      if(response.data === 'match') {
        console.log('match!!');
      }
    })
    .catch((err) => {
      console.log('POST request failed for /login', err);
    })
  }

  //POST logform info to server
  handleLogForm(exercise, sets, reps, date) {
     axios.post('/logs', { exercise: exercise, sets: sets, reps: reps, username: this.state.username, created_at: date })
     .catch((err) => {
      console.log(err);
     })
  }

  //POST item to delete to server
  deleteLog(id, index) {
    const copy = this.state.logData;

    this.state.logData.map((item, i) => {
      if(index === i) {
        copy.splice(i, 1);
      }
    })

    this.setState({ logData: copy });
    
    axios.delete('/deleteLog', { params: { logId: id } })
    .catch((err) => {
      console.log('error deleting log', err);
    })
  }

  //GET log information from server
  handleViewLogs(date) {
    axios.get('/logs', { params: { date: date, username: this.state.username }})
    .then((data) => {
      this.setState({
        logData: data.data
      })
    })
    .catch((err) => {
      console.log('GET request failed for /logs', err);
    })
  }


  render() {
  	return(
      <div className='app_container'>
        <Navbar handleView={ this.handleView } />

        <Switch>
          <Route exact path='/login' render={ () => (
            <LogIn handleLogin={ this.handleLogin } />
          )} />

          <Route exact path='/signup' render={ () => (
            <SignUp handleSignUp={ this.handleSignUp } />
          )} />

          <Route exact path='/chatroom' render={ () => (
            <Chat getChatMessages={ this.getChatMessages } chatHistory={ this.state.chatHistory } username={ this.state.username } />
          )} />

          <Route exact path='/' render={ () => (
            <Log logData={ this.state.logData } handleViewLogs={ this.handleViewLogs } deleteLog={ this.deleteLog } handleLogForm={ this.handleLogForm } />
          )} />

        </Switch>   
      </div>
  	)
  }
}

export default App;