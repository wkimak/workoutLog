import React from 'react';


class Calendar extends React.Component {
	constructor() {
		super();
	}

	render() {
		var today = new Date();
		var minDate = Number(new Date()) - (24*60*60*1000) * 7;
		return(
			<div>
        Calendar
			</div>

			
		);
	}

}

export default Calendar;