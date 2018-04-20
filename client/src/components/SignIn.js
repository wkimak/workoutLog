import React, {Component} from 'react';

class SignIn extends Component {

  constructor(props) {
    super(props);
    this.state = {

	  }
  }



  render() {
    return(
      <div className="container">
        <div className="row">
          <form>
            <div className="row">
              <div className="input-field col s6 offset-s3">
                <input type="text" className="validate" />
                <label>Username</label>
              </div>
            </div>
     
            <div className="row">
              <div className="input-field col s6 offset-s3">
                <input type="password" className="validate" />
                <label>Password</label>
              </div>
            </div>
        
            <div className="row">
              <button className="waves-light btn-large col s2 offset-s4" name="action">Login</button>
              <button className="waves-light btn-large col s2" name="action" onClick={ (e) => { e.preventDefault(); this.props.handleView('sign up') }} >Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SignIn;