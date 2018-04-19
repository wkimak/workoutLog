import React, {Component} from 'react';
import DayPicker from 'react-day-picker/DayPickerInput';


class ViewLogs extends Component {

  constructor(props){
    super(props);

    this.state = {
      selectedDay: ''
    }
    this.handleDayChange = this.handleDayChange.bind(this);
  }

  componentDidMount() {
    this.props.handleViewLogs(this.props.dateVal);
  }

  handleDayChange(day) {
    this.setState({ selectedDay: day })
    this.props.handleViewLogs(day);
  }


  render() {
    let rows = this.props.logData.map((item, i) => {
      return (
        <tr key={ item.id }>
          <td> { item.exercise } </td>
          <td> { item.sets }  </td>
          <td> { item.reps } </td>
          <td><i className="material-icons" onClick={ () => this.props.deleteLog(item.id, i)}>delete</i></td>
        </tr>
      );
    })

    return(
      <div className='container'>
        <div className='row'>
          <div className='card col s12'>
            <div className='card-content'>
              <DayPicker value={ this.state.selectedDay ? this.state.selectedDay: this.props.dateVal } onDayChange={ (day) => this.handleDayChange(day) } />
              <div className='row'>
                <table>
                  <thead>
                    <tr> 
                      <th> Excersize </th>
                      <th> # Sets </th>
                      <th> # Reps </th>
                    </tr>  
                  </thead>
    
                  <tbody>
                    { rows }
                  </tbody>
                </table>
              </div>
            </div>  
          </div>
        </div>
      </div>
    );
  }
}


export default ViewLogs;