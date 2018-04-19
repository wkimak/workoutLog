import React, {Component} from 'react';

class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      usernameVal: '',
      passwordVal: '',
      confPasswordVal: ''
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
      confPasswordVal: ''
    })

    this.props.handleView('sign in');
  }


  render() {
    return (
      <div className="container"> 
        <div className="row">
          <form onSubmit={ (e) => this.submit(e) }>
            <div className="row">
              <div className="input-field col s6 offset-s3">
                <input name="usernameVal" type="text" value={ this.state.usernameVal } onChange={ (e) => this.handleInputs(e) } />
                <label for="username">Username</label>
              </div>
            </div>
      
            <div className="row">
              <div className="input-field col s6 offset-s3">
                <input name="passwordVal" type="password" className="validate" value={ this.state.passwordVal } onChange={ (e) => this.handleInputs(e) } />
                <label for="password">Password</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s6 offset-s3">
                <input name="confPasswordVal" type="password" className="validate" value={ this.state.confPasswordVal } onChange={ (e) => this.handleInputs(e) } />
                <label for="confPassword">Confirm Password</label>
              </div>
            </div>

           <button className="btn waves-light col s4 offset-s4" type="submit" name="action">Submit</button>

        </form>
      </div>
      </div>
    );
  }
}

export default SignUp;