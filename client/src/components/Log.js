import React, {Component} from 'react';
import LogForm from './LogForm';
import ViewLogs from './ViewLogs';
import moment from 'moment';

/* ------ Level 2 ------ */

class Log extends Component { 

  constructor(props) {
    super(props);

    this.state = {
      viewLogsVisible: false,
      dateVal: moment(new Date()).format('YYYY MM DD').replace(/\s/g, '-')
    }

    this.showViewLogs = this.showViewLogs.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.sendValuesUp = this.sendValuesUp.bind(this);
  }

  handleInput(e) {
    this.setState({ dateVal: e.target.value });
  }

  sendValuesUp(exercise, sets, reps) {
    this.props.handleLogForm(exercise, sets, reps, this.state.dateVal);
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
            <input className='col s4 offset-s1' type='text' placeholder='YYYY-M-D' value={ this.state.dateVal } onChange={ (e) => this.handleInput(e) } />
            <button className='col s4 btn offset-s1' onClick={ () => this.showViewLogs() }>View Logs</button>
          </div>
        </div>
        <LogForm sendValuesUp={ this.sendValuesUp } />
        { this.state.viewLogsVisible ? <ViewLogs dateVal={ this.state.dateVal } deleteLog={ this.props.deleteLog } logData={ this.props.logData } handleViewLogs={ this.props.handleViewLogs } /> : null }
      </div>
    )
  }
}

export default Log;