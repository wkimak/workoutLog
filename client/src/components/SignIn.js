import React from 'react';

class SignIn extends React.Component {

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
          <input type='submit' value='Sign In' />  <button onClick={ () => this.props.handleView('signup') } > Sign Up </button>
        </form>
       
      </div>
    );
  }
}

export default SignIn;