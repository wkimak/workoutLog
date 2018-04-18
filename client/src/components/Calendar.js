import React, {Component} from 'react';
import InfiniteCalendar from 'react-infinite-calendar';



class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numInputs: 1
    }
    this.addInput = this.addInput.bind(this);
  }

  addInput(e) {
    e.preventDefault();
    this.setState({
      numInputs: this.state.numInputs + 1
    })
  }

  render() {
    const inputs = [];
    for(let i = 0; i < this.state.numInputs; i++) {
      inputs.push(<input className='col s4' type='text' placeholder='Excersize' />)
      inputs.push(<input className='col s2' type='text' placeholder='# Reps' />)
    }

	  return(
      <div className='container'> 
        <div className='row'>
          <div className='col s6'>
            <InfiniteCalendar  
              height={window.innerHeight-150}
              rowHeight={70}
              displayOptions={{
                showHeader: false
              }}
             />
           </div>

           <form>
             {inputs}
             <button class="waves-effect waves-teal btn-flat" onClick={ (e) => this.addInput(e) }>Add</button>
           </form>
         </div>
      </div>
    );
  }
}

export default Calendar;