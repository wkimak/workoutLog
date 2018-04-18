import React from 'react';


const Navbar = function({ handleView }) {

  return(
   <nav>
      <div className="nav-wrapper">
        <a href="#" className="brand-logo">Workout Log</a>
        <ul className="right hide-on-med-and-down" onClick={ (event) => handleView(event.target.innerHTML.toLowerCase()) }>
          <li>Log</li>
          <li>Chat</li>
          <li>Sign In</li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;