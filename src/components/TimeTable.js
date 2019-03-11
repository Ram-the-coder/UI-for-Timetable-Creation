import React, { Component } from 'react';
import { connect } from 'react-redux';
import Day from './Day';
import './TimeTable.css';

class TimeTable extends Component {

	constructor()
	{
		super();
		this.state = {
			type: 'Class Timetable',
			sec: 'A',
			dept: 'cse',
			sem: '3',
			faculty: 'John Doe',
			lab: 'MPMC',
		}
	}

	renderDays = () => {
		let days = [];
		days.push(
			<div className="row">
				<div className="col-sm-1 theader" style={{minWidth:40}}>    </div>
				<div className="col theader" key="1">1</div>
				<div className="col theader" key="2">2</div>
				<div className="col theader" key="3">3</div>
				<div className="col theader" key="4">4</div>
				<div className="col theader" key="5">5</div>
				<div className="col theader" key="6">6</div>
				<div className="col theader" key="7">7</div>
				<div className="col theader" key="8">8</div>
			</div>
			);
		for(let i=0; i<5; i++) {
			days.push( <Day day={i} key={i} tt={this.state} /> );
		}
		// let days = this.state.timetable.schedule.map( (day, index) => <Day props={{...this.state}} key={index} /> );
		return <div>{days}</div>;
	}

	renderForm = () => {
		console.log(this.props);
		return ( 
			<div className="row" key="1" >
				<div className="col tt-controls">
					<select	className="form-control form-control-sm" 
							value={this.state.type} 
							onChange = { e => this.setState({ type: e.target.value })}
							>
						<option>Class Timetable</option>
						<option>Lab Timetable</option>
						<option>Faculty Timetable</option>
					</select>
				</div>

				{	

					this.state.type === "Class Timetable" && (
							<div className="col tt-controls">
								<select	className="form-control form-control-sm"
										value = {this.state.sem}
										onChange = { e => this.setState({ sem: e.target.value})}
										>
									{this.props.semList}
								</select>
							</div>
						)
				}
				{
					(this.state.type === "Class Timetable" || this.state.type === "Lab Timetable") && (
							<div className="col tt-controls">
								<select	className="form-control form-control-sm"
										value = {this.state.dept}
										onChange = { e => this.setState({ dept: e.target.value})}
										>
									{this.props.deptsList}
								</select>
							</div>
						)
				}
				{
					this.state.type === "Class Timetable" && (
							<div className="col tt-controls">
								<select	className="form-control form-control-sm"
										value = {this.state.sec}
										onChange = { e => this.setState({ sec: e.target.value})}
										>
									{this.props.sectionsList}
								</select>
							</div>
						)

				}
				{
					this.state.type === "Lab Timetable" && (
							<div className="col tt-controls">
								<select class="form-control form-control-sm">
									{this.props.labsList}
								</select>
							</div>						
						)
				}
				{
					this.state.type === "Faculty Timetable" && (
							<div className="col tt-controls">
								<select	className="form-control form-control-sm"
										value = {this.state.lab}
										onChange = { e => this.setState({ lab: e.target.value})}
										>
									{this.props.facultyList}
								</select>
							</div>
						)
				}
			</div>
		)
	}

	renderTimeTable = () => {
		return [this.renderForm(), this.renderDays()]
	}

	render() {
		return (
			<div className="time-table">
				{this.renderTimeTable()}
			</div>
		)
	}
}

const mapStateToProps = state => {

	const semList = [], sectionsList = [], deptsList = [], labsList = [], facultyList = [];

	for(let i in state.semesters) {
		semList.push(<option key={i}>{state.semesters[i]}</option>);
	}

	for(let i in state.sections) {
		sectionsList.push(<option key={i}>{state.sections[i]}</option>);
	}

	for(let i in state.depts) {
		deptsList.push(<option key={i}>{state.depts[i]}</option>);
	}

	for(let i in state.labs) {
		labsList.push(<option key={i}>{state.labs[i].name}</option>);
	}

	for(let i in state.faculties) {
		facultyList.push(<option key={i}>{state.faculties[i].name}</option>);
	}

	return {
		semList,
		sectionsList,
		deptsList,
		labsList,
		facultyList,
	}
}

export default connect(mapStateToProps)(TimeTable);