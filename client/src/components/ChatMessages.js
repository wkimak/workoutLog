import React, { Component } from 'react';

/* -------- Level 3 ------- */

class ChatMessages extends Component {

  constructor(props) {
    super(props);

  }


  render() {

    console.log('PV', this.props.privateMessages);

    return(
      <div className='row chat_room'>  

        { this.props.isPrivate ? this.props.privateMessages.map((msg, i) => {
            return(
              <div key={ i } className='row message_container'>
                <span className='left-align username'>{ msg.username }</span>
                <span className='right timestamp'>{ msg.time }</span>
                <div>{ msg.message }</div>
              </div>
            )
        }) 
        :
        this.props.publicMessages.map((msg, i) => {
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






