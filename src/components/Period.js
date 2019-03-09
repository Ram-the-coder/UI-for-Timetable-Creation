import React from 'react';
import { connect } from 'react-redux';
import './Period.css';

const Period = (props) => {
	console.log(props);
	let allottedPeriod="xyz";
	const dept = props.tt.dept.toLowerCase();
	const faculty = props.tt.faculty;
	const lab = props.tt.lab;
	const sem = props.tt.sem;
	const type = props.tt.type;
	const sec = props.tt.sec.toLowerCase();
	let classList = "period col"

// ******** DETERMINE ALLOTTED PERIOD ********
	switch(type) {
		case "Class Timetable": {
			const classid = dept + sem + sec;
			if(props.classes[classid]) {
				allottedPeriod = props.classes[classid].timeTable.schedule[props.day][props.period];
				classList += (allottedPeriod != "") ? " allotted" : " multihour";
			}
			else {
				allottedPeriod = "";
				classList += " multihour";
			}
		}
	}



	return <div className={classList}>
			{allottedPeriod}
			</div>
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Period);