import React, {Component} from 'react';

class Chat extends Component {
	constructor() {
		super();
	}

	render() {
		return(
      <div className='container'>
        <div className='row'>
          <div className='card darken-1'>
            <div className='card-content'>
              <div className='row chat_room'> </div>
              <div className='row'>
                <input className='browser-default col s8' type='text' placeholder='Message' />
                <button className="btn col s2 offset-s1">Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
		);
	}
}

export default Chat;