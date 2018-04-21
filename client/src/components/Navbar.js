import React from 'react';
import { Link } from 'react-router-dom'; 


const Navbar = function({ handleView }) {

  return(
   <nav>
      <div className="nav-wrapper">
        <a href="#" className="brand-logo">Workout Log</a>
        <ul className="right hide-on-med-and-down">
          <li><Link to='/log'>Log</Link></li>
          <li><Link to='/chatroom'>Chat</Link></li>
          <li><Link to='/login'>Log In</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;