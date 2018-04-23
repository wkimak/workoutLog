import React, {Component} from 'react';
import { Redirect, Link } from 'react-router-dom';

class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      usernameVal: '',
      passwordVal: '',
      confPasswordVal: '',
      fireRedirect: false
	  }

    this.handleInputs = this.handleInputs.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleInputs(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  submit(e) {
    e.preventDefault();
    this.props.handleSignUp(this.state.usernameVal, this.state.passwordVal);
    this.setState({
      usernameVal: '',
      passwordVal: '',
      confPasswordVal: '',
      fireRedirect: true
    }) 
  }

  render() {
    return (
      <div className="container"> 
        <div className="row">
          <form onSubmit={ (e) => this.submit(e) }>
            <div className="row">
              <div className="input-field col s6 offset-s3">
                <input name="usernameVal" type="text" value={ this.state.usernameVal } onChange={ (e) => this.handleInputs(e) } required />
                <label>Username</label>
              </div>
            </div>
      
             <div className="row">
              <div className="input-field col s6 offset-s3">
                <input name="passwordVal" type="password" className="validate" value={ this.state.passwordVal } onChange={ (e) => this.handleInputs(e) } required />
                <label>Password</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s6 offset-s3">
                <input name="confPasswordVal" type="password" className="validate" value={ this.state.confPasswordVal } onChange={ (e) => this.handleInputs(e) } required />
                <label>Confirm Password</label>
              </div>
            </div>

             <button className="btn waves-light col s4 offset-s4" type="submit" name="action">Submit</button> 
          </form>
           { this.state.fireRedirect ? <Redirect to='/login' /> : null }
        </div>
      </div>
    );
  }
}

export default SignUp;