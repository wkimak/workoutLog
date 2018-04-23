import React from 'react';

/* ------ Level 3 ------ */

const ActiveUsers = ({ activeUsers, openChats, currentRoom, switchRooms }) => {
	return(
    <div className='col s4'>
      <div className='card dark-1 active_users_container'>
        <div className='card-content'>
          <h6 className='center-align'>Active Users</h6>
          <ul>
            <li onClick={ (e) => switchRooms('public') }><i className="material-icons">person</i>public chat</li>
          {activeUsers.map((usr, i) => {
            return(
              <li key={ i } onClick={ (e) => switchRooms(usr) }><i className="material-icons">person</i>{usr}</li>
            )
          })}

          </ul>
          
          <h6 className='center-align open_chats'> Current Chats </h6>
          <ul>
            {openChats.map((room, i) => {
              return(
              <li key={ i } style={ room === currentRoom ? {color: 'red'} : {color: 'black'}}>  { room } </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
	)



}

export default ActiveUsers;