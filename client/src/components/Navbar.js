import React from 'react';
import { Link } from 'react-router-dom'; 


const Navbar = function({ handleView, authenticated, logOut }) {

  return(
   <nav>
      <div className="nav-wrapper #01579b light-blue darken-4">
        <a href="#" className="brand-logo">Workout Log</a>
        <ul className="right hide-on-med-and-down">
          <li><Link to='/log'>Log</Link></li>
          <li><Link to='/chatroom'>Chat</Link></li>
          <li onClick={ () => authenticated ? logOut() : null }><Link to='/login'>{ authenticated ? 'Log Out': 'Log In' }</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;