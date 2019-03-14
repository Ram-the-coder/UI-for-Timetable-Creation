
import React, { Component } from 'react';
import { connect } from 'react-redux';

class List extends Component {
	render() {
		return (
				<div className="row">
					<div id="classes" className="col detailsTable">
						<h3>Classes</h3>
						<table className="table table-striped table-bordered">
							<thead>
								<tr>
									<th>Department</th>
									<th>Year</th>
									<th>Section</th>
								</tr>
							</thead>
							<tbody>
								{this.props.classesList}
							</tbody>
						</table>
					</div>
					<div id="faculties" className="col detailsTable">
						<h3>Faculties</h3>
						<table className="table table-striped table-bordered">
							<thead>
								<tr>
									<th>Name</th>
									<th>subjectsHandled</th>
								</tr>
							</thead>
							<tbody>
								{this.props.facultyList}
							</tbody>
						</table>
						<div className="button group row">
							<button className="btn btn-secondary buttonControls col">Add</button>
							<button className="btn btn-secondary buttonControls col">Update</button>
							<button className="btn btn-secondary buttonControls col">Remove</button>
						</div>
					</div>
					<div id="labs" className="col detailsTable">
						<h3>Labs</h3>
						<table className="table table-striped table-bordered">
							<thead>
								<tr>
									<th>Department</th>
									<th>Name</th>
								</tr>
							</thead>
							<tbody>
								{this.props.labList}
							</tbody>
						</table>
					</div>
				</div>
			)
	}
}

const mapStateToProps = state => {

	let classesList = [];
	for(let i in state.classes ) {
		classesList.push(
			<tr key={i} >
				<td>{state.classes[i].dept}</td>
				<td>{state.classes[i].sem}</td>
				<td>{state.classes[i].sec}</td>
			</tr>
			)
	}

	let facultyList = [];
	for(let i in state.faculties) {
		facultyList.push(
			<tr key={i}>
				<td>{state.faculties[i].name}</td>
				<td>{state.faculties[i].subjectsHandled}</td>
			</tr>
			)
	}

	let labList = [];
	for(let i in state.labs) {
		labList.push(
			<tr key={i}>
				<td>{state.labs[i].dept}</td>
				<td>{state.labs[i].labName}</td>
			</tr>
			)
	}

	return {
		classesList,
		facultyList,
		labList
	};
}


export default connect(mapStateToProps, null)(List);