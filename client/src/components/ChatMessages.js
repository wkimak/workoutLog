import React, { Component } from 'react';

class ChatMessages extends Component {

  constructor(props) {
    super(props);

  }


  render() {

    return(
      <div className='row chat_room'>               
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






