import React from 'react';

/* ------ Level 3 ------ */

const ActiveUsers = ({ activeUsers, privateRoom }) => {

	return(
    <div className='col s4'>
      <div className='card dark-1 active_users_container'>
        <div className='card-content'>
          <h6 className='center-align'>Active Users</h6>
          <ul>

          {activeUsers.map((usr, i) => {
            return(
              <li key={ i } onClick={ (e) => privateRoom(e.target.innerHTML) }><i className="material-icons">person</i>{usr}</li>
            )
          })}

          </ul>
        </div>
      </div>
    </div>
	)



}

export default ActiveUsers;