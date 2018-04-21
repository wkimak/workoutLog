import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class LogIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
	  }

    this.handleInputs = this.handleInputs.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleInputs(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submit(e) {
    e.preventDefault();
    this.props.handleLogin(this.state.username, this.state.password);
    this.setState({ username: '', password: '' })
  }



  render() {
    return(
      <div className="container">
        <div className="row">
          <form onSubmit={ (e) => this.submit(e) }>
            <div className="row">
              <div className="input-field col s6 offset-s3">
                <input value={ this.state.username } onChange={ (e) => this.handleInputs(e) } name='username' type="text" className="validate" />
                <label>Username</label>
              </div>
            </div>
     
            <div className="row">
              <div className="input-field col s6 offset-s3">
                <input value={ this.state.password } onChange={ (e) => this.handleInputs(e) } name='password' type="password" className="validate" />
                <label>Password</label>
              </div>
            </div>
        
            <div className="row">
              <button className="waves-light btn-large col s2 offset-s4" name="action">Login</button>
              <Link className='waves-light btn-large col s2' to='/signup'>Sign Up</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default LogIn;