import React from 'react';

class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

	}
  }

  render() {
    return(
      <div>
        <form>
          <input type='text' placeholder='Username' />
          <input type='password' placeholder="Password" />
          <input type='password' placeholder='Confirm Password' />
          <input type='submit' value='Submit' />
        </form>
      </div>
    );
  }
}

export default SignUp;