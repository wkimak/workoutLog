import React, {Component} from 'react';

class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

	}
  }

  render() {
    return (
      <div className="container"> 
        <div className="row">
          <form>
            <div className="row">
              <div className="input-field col s6 offset-s3">
                <input id="last_name" type="text" className="validate" />
                <label for="last_name">Username</label>
              </div>
            </div>
      
            <div className="row">
              <div className="input-field col s6 offset-s3">
                <input type="password" className="validate" />
                <label for="password">Password</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s6 offset-s3">
                <input type="password" className="validate" />
                <label for="password">Confirm Password</label>
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