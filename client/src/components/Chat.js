import React, {Component} from 'react';

class Chat extends Component {
	constructor() {
		super();
	}

	render() {
		return(
          <div className='container z-depth-3'>
            <div className='row chat_room'> </div>
            <div className='row'>
              <input className='browser-default col s8' type='text' placeholder='Message' />
              <button className="btn col s2 offset-s1">Send</button>
            </div>
          </div>
		);
	}
}

export default Chat;