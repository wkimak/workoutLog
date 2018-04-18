import React, {Component} from 'react';

class LogForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
      numRows: 1
		}

    this.addRow = this.addRow.bind(this);
	}



  addRow(e) {
    e.preventDefault();
    this.setState({
      numRows: this.state.numRows + 1
    })
  }


	render() {

		const rows = [];

    let row = <tr>
    <td><input className='browser-default col s8' type='text' /></td>
    <td> <input className='browser-default col s3' type='text' /></td>
    <td><input className='browser-default col s3' type='text' /></td>
    </tr>;

		for(let i = 0; i < this.state.numRows; i++) {
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
                    <th> Excersize </th>
                    <th> # Sets </th>
                    <th> # Reps </th>
                  </tr>  
                </thead>

                <tbody>
                  {rows}
                </tbody>
              </table>
			 
			        <button className="waves-effect waves-teal btn-flat" onClick={ (e) => this.addRow(e) }>Add</button>
			      </div>
          </div>
        </div>
      </div>
   
		);
	}
}


export default LogForm;