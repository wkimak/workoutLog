import React from 'react';
import LogForm from './LogForm';

/* ------ Level 2 ------ */

const Log = function() {

	return (
		<div className='log_container'>
     <div className='container'>
      <div className='row'>
          <input className='col s4 offset-s1' type='text' placeholder='Date' />
          <button className='col s2 btn offset-s1'>Submit</button>
          <button className='col s2 btn'>View Logs</button>
      </div>
      </div>
        <LogForm />
		</div>

	)
}

export default Log;