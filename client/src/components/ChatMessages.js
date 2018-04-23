import React, { Component } from 'react';

/* -------- Level 3 ------- */

class ChatMessages extends Component {

  constructor(props) {
    super(props);

  }


  render() {

    return(
      <div className='row chat_room'>  
        <p>{ this.props.roomUpdate }</p>
        { this.props.messages.map((msg, i) => {
            return(
              <div key={ i } className='row message_container'>
                <span className='left-align username'>{ msg.username }</span>
                <span className='right timestamp'>{ msg.time }</span>
                <div>{ msg.message }</div>
              </div>
            )
        })}         
      </div>
    )
  }
}

export default ChatMessages;






