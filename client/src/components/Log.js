import React, {Component} from 'react';
import LogForm from './LogForm';
import ViewLogs from './ViewLogs';

/* ------ Level 2 ------ */

class Log extends Component { 

  constructor(props) {
    super(props);

    this.state = {
      viewLogsVisible: false,
    }

    this.showViewLogs = this.showViewLogs.bind(this);
  }


  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }


  showViewLogs() {
    this.setState({
      viewLogsVisible: !this.state.viewLogsVisible
    })
  }


  render() {
	  return (
		  <div>
        <div className='container'>
          <div className='row'>
            <input className='col s4 offset-s1' type='text' placeholder='Date' />
            <button className='col s2 btn offset-s1'>Submit</button>
            <button className='col s2 btn' onClick={ () => this.showViewLogs() }>View Logs</button>
          </div>
        </div>
        <LogForm />
        { this.state.viewLogsVisible ? <ViewLogs /> : null }
      </div>
    )
  }
}

export default Log;