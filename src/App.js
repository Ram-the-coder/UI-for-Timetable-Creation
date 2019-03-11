import React, { Component } from 'react';
import './App.css';
import TimeTable from './components/TimeTable';
import { connect } from 'react-redux';
import List from './components/List';

class App extends Component {

	constructor() {
		super();
		this.state = {
			w1: false,
			w2: false,
			w3: false,
			w4: false,
			keyCode: "",
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
		if(e.keyCode === 49 && e.ctrlKey) {
			this.state["w1"] ? this.closeWorkArea("w1") : this.setState({["w1"]: true});
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
	        	<h1>Demo UI for Timetable creation</h1>
	        	<div className="workspace row">
	        		<div className="work-area col-lg-6 row">
	        			<div className = "col-sm-11">
	        				{this.state.w1 && <TimeTable id="1" />}
	        			</div>
	        			<div className = "col-sm-1">
	        				{
	        					this.state.w1 	?	<button className="btn btn-sm btn-danger open-close" data-w="w1" onClick={this.toggleW} title="Close this Timetable" >x</button>
	        									: 	<button className="btn btn-sm btn-success open-close" data-w="w1" onClick={this.toggleW} title="Open a timetable in this area">+</button>
	        				}
	        			</div>
	        		</div>
	        		<div className="work-area col-lg-6 row">

	        		</div>
	        	</div>
		        <div className="workspace row">
		        	<div className="work-area col-lg-6 row">
	        			<div className = "col-sm-11">
	        				{this.state.w3 && <TimeTable />}
	        			</div>
	        			<div className = "col-sm-1">
	        				{
	        					this.state.w3 	?	<button className="btn btn-sm btn-danger" onClick={()=>this.setState({w3:false})} >-</button>
	        									: 	<button className="btn btn-sm btn-success" onClick={()=>this.setState({w3:true})}>+</button>
	        				}
	        			</div>
	        		</div>
	        		<div className="work-area col-lg-6 row"></div>
		        </div>

		        <div>
		        	<p>
					  	<button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapsibleList" aria-expanded="false" aria-controls="collapsibleList">
					   		Details
					  	</button>
					</p>
					<div className="collapse" id="collapsibleList">
						<List />
					</div>

		        </div>
      		</div>
    	);
  	}
}

const mapStateToProps = state => {
	console.log("appjs - mapStateToProps");
	console.log(state);
	return state;
}

export default connect(mapStateToProps, null)(App);
