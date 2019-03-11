import React from 'react';
import Period from './Period';
import {connect} from 'react-redux';

const Day = (props) => {
	let periods = [];
	const dayName = ["Mon", "Tue", "Wed", "Thu", "Fri"];

	periods.push(
		<div className="theader col-sm-1" style={{minWidth: 40}} >{dayName[props.day]}</div>
		)
	for( let i = 0; i < 8; i++)
	{
		periods.push( <Period key={i} day={props.day} tt={props.tt} period={i} /> );
	}
	return <div className="row">{periods}</div>
}

const mapStateToProps = state => {
	return {

	}
}

export default Day;
