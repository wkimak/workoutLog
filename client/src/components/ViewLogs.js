import React, {Component} from 'react';
import DayPicker from 'react-day-picker/DayPickerInput';


  
const ViewLogs = function({ deleteLog, handleViewLogs, logData }) {

  let rows = logData.map((item, i) => {
    console.log('MAPPED', item)
    return (
      <tr key={ item.id }>
        <td> { item.exercise } </td>
        <td> { item.sets }  </td>
        <td> { item.reps } </td>
        <td><i className="material-icons" onClick={ () => deleteLog(item.id, i)}>delete</i></td>
      </tr>
    );
  })

  return(
    <div className='container'>
      <div className='row'>
        <div className='card col s12'>
          <div className='card-content'>
            <DayPicker value={ new Date() } onDayChange={ (day) => handleViewLogs(day) } />
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


export default ViewLogs;