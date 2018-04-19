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
      username: ''
    }

    this.handleView = this.handleView.bind(this);
    this.renderView = this.renderView.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleLogForm = this.handleLogForm.bind(this);
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


  handleView(option) {
    this.setState({
      view: option
    })
  }

  renderView() {
    if(this.state.view === 'log') {
      return <Log handleLogForm={ this.handleLogForm } handleView={ this.handleView } />
    } else if(this.state.view === 'chat') {
      return <Chat />
    } else if(this.state.view === 'sign in') {
      return <SignIn handleView={ this.handleView } />
    } else if(this.state.view === 'sign up') {
      return <SignUp handleSignUp={ this.handleSignUp } />
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