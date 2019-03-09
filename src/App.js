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
			w4: false
		}
	}

	toggleW = (e) => {
		const workArea = e.target.dataset.w;

		this.setState({
			[workArea]: !this.state[workArea] 
		})

	}

	render() {
    	return (
      		<div className="App">
	        	<h1>Time Table Management</h1>
	        	<div className="workspace row">
	        		<div className="work-area col-lg-6 row">
	        			<div className = "col-sm-11">
	        				{this.state.w1 && <TimeTable />}
	        			</div>
	        			<div className = "col-sm-1">
	        				{
	        					this.state.w1 	?	<button className="btn btn-sm btn-danger" data-w="w1" onClick={this.toggleW} >-</button>
	        									: 	<button className="btn btn-sm btn-success" data-w="w1" onClick={this.toggleW}>+</button>
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
