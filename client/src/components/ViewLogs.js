import React, {Component} from 'react';
import DayPicker from 'react-day-picker/DayPickerInput';


class ViewLogs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
    }
    
  }

  render() {
	  return(
      <div className='container'>
      <div className='row'>
        <div className='card col s12'>
          <div className='card-content'>
             <DayPicker />
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
                       <tr>
                         <td>yoyoy</td>
                         <td>heyehye</td>
                         <td>supsupsup</td>
                       </tr>
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