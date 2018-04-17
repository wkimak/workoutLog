import React from 'react';

const Navbar = function({ handleView }) {

  return(
    <div className='navbar_container'>
      <ul onClick={(event) => handleView(event.target.value)}>
        <li value='1'>Calendar</li>
        <li value='2'>Forum</li>
        <li value='3'>Sign In</li>
      </ul>
    </div>  
  );
}

export default Navbar;