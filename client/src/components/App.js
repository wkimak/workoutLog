import React from 'react';
import Navbar from './Navbar';
import Calendar from './Calendar';
import Forum from './Forum';
import SignIn from './SignIn';
import SignUp from './SignUp';


class App extends React.Component {

  constructor(props) {
  	super(props);

    this.state = {
      view: 3
    }

    this.handleView = this.handleView.bind(this);
    this.renderView = this.renderView.bind(this);
  }



  handleView(option) {
    this.setState({
      view: option
    })
  }

  renderView() {
    if(this.state.view === 1) {
      return <Calendar />
    } else if(this.state.view === 2) {
      return <Forum />
    } else if(this.state.view === 3) {
      return <SignIn handleView={ this.handleView } />
    } else if(this.state.view === 'signup') {
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