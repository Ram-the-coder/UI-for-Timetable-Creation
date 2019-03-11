import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Period.css';

class Period extends Component {

	constructor(props) {
		super(props);
		let [allottedPeriod, bgColor] = Period.extractInformation(props);
		this.state = {
			tt: props.tt,
			allottedPeriod: allottedPeriod,
			bgColor: bgColor,
		}

	}

	// Updates the state according to the changes either in the Redux store or the timetable to be displayed
	// which can be changed in the form in TimeTable.js whose values are passes as props
	static getDerivedStateFromProps(nextProps, prevState) {
		if(nextProps.tt !== prevState.tt) {
			let [allottedPeriod, bgColor] = Period.extractInformation(nextProps);
			return {
				tt: nextProps.tt,
				allottedPeriod,
				bgColor
			}
		}
		else 
			return null;
	}

	// updates the suggestions to be displayed in the suggestions box 
	updateSuggestions = e => {

		const doesSuggestionsExist = document.getElementById("suggestionsBox");
		if(!doesSuggestionsExist) {
			const offsetLeft = e.target.offsetLeft;
			const offsetTop = e.target.offsetTop;
			const offsetHeight = e.target.offsetHeight;
			const suggestionsBox = document.createElement("div");
			const styles = {
				position: "absolute",
				left: offsetLeft + "px",
				top: offsetTop + offsetHeight + "px",
				height: "100px",
				width: "100px",
				backgroundColor: "white",
				border: "1px solid black",
				boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
				zIndex: 51,

			};
			suggestionsBox.setAttribute("id", "suggestionsBox");
			Object.assign(suggestionsBox.style, styles);
			e.target.parentNode.parentNode.appendChild(suggestionsBox);	
		}

		const suggestionsBox = document.getElementById("suggestionsBox");


	}

	handleInput = e => {
		this.updateSuggestions(e);
	}

	handleBlur = () => {
		const suggestionsBox = document.getElementById("suggestionsBox");
		if(suggestionsBox)
			suggestionsBox.parentNode.removeChild(suggestionsBox);
	}


	// Sets the state of allotedPeriod and bgColor
	static extractInformation(props) {
		// console.log("extractInformation");
		let allottedPeriod, bgColor;
		const green = "#4cd137";
		const red = "#c23616";
		const orange = "#fbc531";
		const dept = props.tt.dept.toLowerCase();
		const faculty = props.tt.faculty;
		const lab = props.tt.lab;
		const sem = props.tt.sem;
		const type = props.tt.type;
		const sec = props.tt.sec.toLowerCase();
		switch(type) {
			case "Class Timetable": {
				const classid = dept + sem + sec;
				if(props.classes[classid]) {
					const period = props.classes[classid].timeTable.schedule[props.day][props.period];
					allottedPeriod = period.text
					if((allottedPeriod === undefined) || (allottedPeriod !== '')) {
						bgColor = red;
					}
					else if(period.status === "isolated")
						bgColor = orange;
					else
						bgColor = green;
				}
				else {
					allottedPeriod = "";
					bgColor = red;
				}
			}
		}
		return [allottedPeriod, bgColor];
	}

	checkForEscape = (e) => {
		if(e.keyCode !== 27)
			return;
		document.activeElement.blur();
	}



	render() {
		console.log(this.state.tt.dept);
		return <input 	
					type="text"
					className="period col" 
					style = {{backgroundColor: this.state.bgColor}}
					contentEditable = "true"
					onInput = { (e) => this.handleInput(e)}
					onBlur = { () => this.handleBlur()}
					value = {this.state.allottedPeriod}
					onKeyDown = { (e) => this.checkForEscape(e) }
					title = "Click and type a subject name"
				>
			</input>
	}
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Period);