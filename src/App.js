import React, { Component } from 'react';
import './App.css';
import TimeTable from './components/TimeTable';
import { connect } from 'react-redux';
import List from './components/List';

class App extends Component {

	constructor() {
		super();
		this.state = {
			w1: true,
			w2: false,
			w3: false,
			w4: false,
		}
	}

	componentDidMount() {
		document.addEventListener("keydown", this.checkKeyCodes);
	}

	toggleW = (e) => {
		const workArea = e.target.dataset.w;
		this.state[workArea] ? this.closeWorkArea(workArea) : this.setState({[workArea]: true});
	}

	checkKeyCodes = e => {
		if(e.ctrlKey && (e.keyCode > 48) && (e.keyCode < 53)) {
				e.preventDefault();
				let workArea = "w" + (e.keyCode - 48);
				this.state[workArea] ? this.closeWorkArea(workArea) : this.setState({[workArea]: true});
		}
	}

	closeWorkArea = (workArea) => {
		if(window.confirm("Are you sure that you want to CLOSE Timetable " + workArea[1] + "?"))
			this.setState({
				[workArea]: false
			})
	}

	render() {
    	return (
      		<div className="App" >
      			<div className="row">
      				<h1 className="col-sm-10">Demo UI for Timetable creation</h1>	
      				<div className="col-sm-2">
      					<button className="btn btn-secondary buttonControls" 
				  			type="button" 
				  			data-toggle="collapse" 
				  			data-target="#collapsibleList" 
				  			aria-expanded="false" 
				  			aria-controls="collapsibleList"
				  			>
				   		Click to open/close color scheme explanation
				  		</button>
      				</div>
      				
      			</div>
	        	<div className="workspace row">
	        		<div className="work-area col-lg-6 row">
	        			<div className = "col-sm-11">
	        				{
	        					this.state.w1 
	        								? <TimeTable id="1" /> 
	        								: <div className="permaTooltip">Press the + button to open a new timetable here (Ctrl+1)</div>
	        				}
	        			</div>
	        			<div className = "col-sm-1">
	        				{
	        					this.state.w1 	?	<button className="btn btn-sm btn-danger open-close" data-w="w1" onClick={this.toggleW} title="Close this Timetable (Ctrl+1)" >x</button>
	        									: 	<button className="btn btn-sm btn-success open-close" data-w="w1" onClick={this.toggleW} title="Open a timetable in this area (Ctrl+1)">+</button>
	        				}
	        			</div>
	        		</div>
	        		<div className="work-area col-lg-6 row">
	        			<div className = "col-sm-11">
	        				{
	        					this.state.w2 
	        								? <TimeTable id="2" /> 
	        								: <div className="permaTooltip">Press the + button to open a new timetable here (Ctrl+2)</div>
	        				}
	        			</div>
	        			<div className = "col-sm-1">
	        				{
	        					this.state.w2 	?	<button className="btn btn-sm btn-danger open-close" data-w="w2" onClick={this.toggleW} title="Close this Timetable (Ctrl+2)" >x</button>
	        									: 	<button className="btn btn-sm btn-success open-close" data-w="w2" onClick={this.toggleW} title="Open a timetable in this area (Ctrl+2)">+</button>
	        				}
	        			</div>
	        		</div>
	        	</div>
	        	<div className="workspace row">
	        		<div className="work-area col-lg-6 row">
	        			<div className = "col-sm-11">
	        				{
	        					this.state.w3 
	        								? <TimeTable id="3" /> 
	        								: <div className="permaTooltip">Press the + button to open a new timetable here (Ctrl+3)</div>
	        				}
	        			</div>
	        			<div className = "col-sm-1">
	        				{
	        					this.state.w3 	?	<button className="btn btn-sm btn-danger open-close" data-w="w3" onClick={this.toggleW} title="Close this Timetable (Ctrl+3)" >x</button>
	        									: 	<button className="btn btn-sm btn-success open-close" data-w="w3" onClick={this.toggleW} title="Open a timetable in this area (Ctrl+3)">+</button>
	        				}
	        			</div>
	        		</div>
	        		<div className="work-area col-lg-6 row">
	        			<div className = "col-sm-11">
	        				{
	        					this.state.w4 
	        								? <TimeTable id="4" /> 
	        								: <div className="permaTooltip">Press the + button to open a new timetable here (Ctrl+4)</div>
	        				}
	        			</div>
	        			<div className = "col-sm-1">
	        				{
	        					this.state.w4 	?	<button className="btn btn-sm btn-danger open-close" data-w="w4" onClick={this.toggleW} title="Close this Timetable (Ctrl+4)" >x</button>
	        									: 	<button className="btn btn-sm btn-success open-close" data-w="w4" onClick={this.toggleW} title="Open a timetable in this area (Ctrl+4)">+</button>
	        				}
	        			</div>
	        		</div>
	        	</div>
		        

		        {/*<div>
		        	<p>
					  	<button className="btn btn-secondary buttonControls btn-block" type="button" data-toggle="collapse" data-target="#collapsibleList" aria-expanded="false" aria-controls="collapsibleList">
					   		Show Classes, Faculties and Labs Data
					  	</button>
					</p>
					<div className="collapse" id="collapsibleList">
						<List />
					</div>

		        </div>*/}
		        <div>
					<div className="collapse color-schema" id="collapsibleList">
						<div className="row color-schema-row">
							<div className="color-scheme col-sm-1" style={{backgroundColor: "#4cd137"}} />
							<div className="col-sm-11 color-scheme-exp">2 consecutive periods exist, a lab can be allotted here</div>
						</div>
						<div className="row color-schema-row">
							<div className="color-scheme col-sm-1" style={{backgroundColor: "#fbc531"}} />
							<div className="col-sm-11 color-scheme-exp">2 consecutive periods does not exist, a lab cannot be allotted here</div>
						</div>
						<div className="row color-schema-row">
							<div className="color-scheme col-sm-1" style={{backgroundColor: "#c23616"}} />
							<div className="col-sm-11 color-scheme-exp">Period allotted</div>
						</div>
					</div>		        	
		        </div>
      		</div>
    	);
  	}
}

const mapStateToProps = state => {
	return state;
}

export default connect(mapStateToProps, null)(App);
