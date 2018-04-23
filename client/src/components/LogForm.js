import React, {Component} from 'react';

/* ------ Level 3 ------ */

class LogForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
      numRows: 1,
      exerciseVals: [],
      setsVals: [],
      repsVals: []
		}

    this.addRow = this.addRow.bind(this);
    this.submitLog = this.submitLog.bind(this);

	}


  submitLog(rows) {
    for(let i = 0; i < rows.length; i++) {
      this.state.exerciseVals.push(this.refs['exercise' + i].value);
      this.state.setsVals.push(this.refs['sets' + i].value);
      this.state.repsVals.push(this.refs['reps' + i].value);
    }

    this.setState(this.state);

    this.props.sendValuesUp(this.state.exerciseVals, this.state.setsVals, this.state.repsVals);

    this.refs.exercise0 = '';
    this.refs.sets0 = '';
    this.refs.reps0 = '';
    this.setState({
      numRows: 1,
    })


  }

  addRow(e) {
    e.preventDefault();
    this.setState({
      numRows: this.state.numRows + 1
    })
  }



	render() {
		const rows = [];
		for(let i = 0; i < this.state.numRows; i++) {
      let row = <tr key={i} >
       <td><input ref={'exercise' + i} name='exercise' className='browser-default col s8' type='text' /></td>
       <td> <input ref={'sets' + i} name='sets' className='browser-default col s3' type='text' /></td>
       <td><input ref={'reps' + i} name='reps' className='browser-default col s3' type='text' /></td>
     </tr>;

		  rows.push(row);
		}

		return (
      <div className='container'>
        <div className='row'>
          <div className='card darken-1'>
            <div className='card-content'>
			        <table>
                <thead>
                  <tr> 
                    <th> Exercise </th>
                    <th> # Sets </th>
                    <th> # Reps </th>
                  </tr>  
                </thead>

                <tbody>
                  {rows}
                </tbody>    
              </table>
              
              <div className='row logForm_buttons'>
                <button className="waves-teal btn-flat col s2" onClick={ (e) => this.addRow(e) }>Add</button>
                <button className='col s3 btn offset-s6' onClick={ () => this.submitLog(rows) }>Submit</button>
              </div>
			      </div>
          </div>
        </div>
      </div>
		);
	}
}


export default LogForm;