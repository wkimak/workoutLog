import React, {Component} from 'react';
import Navbar from './Navbar';
import Calendar from './Calendar';
import Chat from './Chat';
import SignIn from './SignIn';
import SignUp from './SignUp';


class App extends Component {

  constructor(props) {
  	super(props);

    this.state = {
      view: 'sign in'
    }

    this.handleView = this.handleView.bind(this);
    this.renderView = this.renderView.bind(this);
  }


  handleView(option) {
    console.log(option);
    this.setState({
      view: option
    })
  }

  renderView() {
    if(this.state.view === 'calendar') {
      return <Calendar />
    } else if(this.state.view === 'chat') {
      return <Chat />
    } else if(this.state.view === 'sign in') {
      return <SignIn handleView={ this.handleView } />
    } else if(this.state.view === 'sign up') {
      return <SignUp />
    }
  }


  render() {
  	return(
      <div>
        <Navbar handleView={ this.handleView } />
        {this.renderView()}
      </div>
  	)
  }
}

export default App;