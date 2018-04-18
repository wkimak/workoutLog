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
      view: 'sign in'
    }

    this.handleView = this.handleView.bind(this);
    this.renderView = this.renderView.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  //POST user to server
  handleSignUp(username, password) {
    axios.post('/users', {username: username, password:password})
    .catch((err) => {
      console.log('POST request failed for /users', err);
    })
  }


  handleView(option) {
    this.setState({
      view: option
    })
  }

  renderView() {
    if(this.state.view === 'log') {
      return <Log handleView={ this.handleView } />
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