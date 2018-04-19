import React, {Component} from 'react';
import Navbar from './Navbar';
import Log from './Log';
import Chat from './Chat';
import SignIn from './SignIn';
import SignUp from './SignUp';

import axios from 'axios';


class App extends Component {

  constructor(props) {
  	super(props);

    this.state = {
      view: 'sign in',
      username: '',
      logData: []
    }

    this.handleView = this.handleView.bind(this);
    this.renderView = this.renderView.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleLogForm = this.handleLogForm.bind(this);
    this.deleteLog = this.deleteLog.bind(this);
    this.handleViewLogs = this.handleViewLogs.bind(this);
  }

  //POST username/password to server
  handleSignUp(username, password) {
    axios.post('/users', {username: username, password:password})
    .catch((err) => {
      console.log('POST request failed for /users', err);
    })

    this.setState({
      username: username
    })
  }

  //POST logform info to server
  handleLogForm(exercise, sets, reps, date) {
     axios.post('/logs', {exercise: exercise, sets: sets, reps: reps, username: this.state.username, created_at: date})
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

  handleView(option) {
    this.setState({
      view: option
    })
  }

  renderView() {
    if(this.state.view === 'log') {
      return <Log logData={ this.state.logData } handleViewLogs={ this.handleViewLogs } deleteLog={ this.deleteLog } handleLogForm={ this.handleLogForm } handleView={ this.handleView } />
    } else if(this.state.view === 'chat') {
      return <Chat />
    } else if(this.state.view === 'sign in') {
      return <SignIn handleView={ this.handleView } />
    } else if(this.state.view === 'sign up') {
      return <SignUp handleView={ this.handleView } handleSignUp={ this.handleSignUp } />
    }
  }


  render() {
  	return(
      <div className='app_container'>
        <Navbar handleView={ this.handleView } />
        {this.renderView()}
      </div>
  	)
  }
}

export default App;