import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Period.css';
import { allotPeriod } from './redux/reducers';


class Period extends Component {

	constructor(props) {
		super(props);
		let [allottedPeriod, bgColor, suggestions] = Period.extractInformation(props);
		this.state = {
			tt: props.tt,
			allottedPeriod: allottedPeriod,
			bgColor: bgColor,
			suggestions: suggestions
		}

	}

	// Updates the state according to the changes either in the Redux store or the timetable to be displayed
	// which can be changed in the form in TimeTable.js whose values are passes as props
	static getDerivedStateFromProps(nextProps, prevState) {
		if(JSON.parse(JSON.stringify(nextProps.tt)) !== JSON.parse(JSON.stringify(prevState.tt))) {
			let [allottedPeriod, bgColor, suggestions] = Period.extractInformation(nextProps);
			return {
				tt: nextProps.tt,
				allottedPeriod,
				bgColor,
				suggestions
			}
		}
		else 
			return null;
	}

	// updates the suggestions to be displayed in the suggestions box 
	// updateSuggestions = e => {

	// 	const doesSuggestionsExist = document.getElementById("suggestionsBox");
	// 	if(!doesSuggestionsExist) {
	// 		const offsetLeft = e.target.offsetLeft;
	// 		const offsetTop = e.target.offsetTop;
	// 		const offsetHeight = e.target.offsetHeight;
	// 		const suggestionsBox = document.createElement("div");
	// 		const styles = {
	// 			position: "absolute",
	// 			left: offsetLeft + "px",
	// 			top: offsetTop + offsetHeight + "px",
	// 			height: "100px",
	// 			width: "100px",
	// 			backgroundColor: "white",
	// 			border: "1px solid black",
	// 			boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
	// 			zIndex: 51,

	// 		};
	// 		suggestionsBox.setAttribute("id", "suggestionsBox");
	// 		Object.assign(suggestionsBox.style, styles);
	// 		e.target.parentNode.parentNode.appendChild(suggestionsBox);	
	// 	}

	// 	const suggestionsBox = document.getElementById("suggestionsBox");
	// 	console.dir(suggestionsBox);
	// 	// const suggestionsList;
	// 	this.state.suggestions.forEach( suggestion => {
	// 		const suggestionListItem = document.createElement('div');
	// 		suggestionListItem.classList.add("suggestionListItem");
	// 		suggestionListItem.innerText = suggestion;
	// 		suggestionsBox.appendChild(suggestionListItem);
	// 	})
		// console.log(suggestionsList);


	// }

	// handleInput = e => {
	// 	this.updateSuggestions(e);
	// }

	// handleBlur = () => {
	// 	const suggestionsBox = document.getElementById("suggestionsBox");
	// 	if(suggestionsBox)
	// 		suggestionsBox.parentNode.removeChild(suggestionsBox);
	// }


	// Sets the state of allotedPeriod and bgColor
	static extractInformation(props) {
		// console.log("extractInformation");
		let allottedPeriod, bgColor, suggestions;
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
				// console.log(props);
				let labPeriods = [];
				Object.keys(props.labs).forEach(key => {
					labPeriods.push(props.labs[key].periodName);
				});
				const suggestionsList = props.subjects.concat(labPeriods);
				// console.log(suggestionsList);
					suggestions = suggestionsList.map( suggestion => {
						return (
							<option className="list-item" value={suggestion}>{suggestion}</option>
							)
					});
				const classid = dept + sem + sec;
				if(props.classes[classid]) {
					const period = props.classes[classid].timeTable.schedule[props.day][props.period];
					allottedPeriod = period.text;
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
				break;
			}
			case "Lab Timetable": {
				let classes = Object.keys(props.classes);
				suggestions = classes.map( suggestion => {
						return (
							<option className="list-item" value={suggestion}>{suggestion}</option>
							)
					});
				let labid = "csempmc";
				const labKeys = Object.keys(props.labs);
				for( let i = 0; i < labKeys.length; i++) {
					if(props.labs[labKeys[i]].labName === props.tt.lab) {
						labid = labKeys[i];
						break;
					}
				}
				allottedPeriod = props.labs[labid].timeTable.schedule[props.day][props.period].text;
				if(allottedPeriod !== "")
					bgColor = red;
				else
					bgColor = green;
				break;

			}
			case "Faculty Timetable": {
				let classes = Object.keys(props.classes);
				suggestions = classes.map( suggestion => {
						return (
							<option className="list-item" value={suggestion}>{suggestion}</option>
							)
					});
				let facultyid;
				const facultyKeys = Object.keys(props.faculties);
				for( let i = 0; i < facultyKeys.length; i++) {
					if(props.faculties[facultyKeys[i]].name === props.tt.faculty) {
						facultyid = facultyKeys[i];
						break;
					}
				}
				allottedPeriod = props.faculties[facultyid].timeTable.schedule[props.day][props.period].text;
				if(allottedPeriod !== "")
					bgColor = red;
				else
					bgColor = green;
				break;
			}
		}
		return [allottedPeriod, bgColor, suggestions];
	}

	checkForDelete = (e) => {
		if(e.ctrlKey) {
			e.target.blur();
			this.setState({allottedPeriod: ""});
			this.props.allotPeriod("", this.props.tt, this.props.day, this.props.period);
		}
	}

	updatePeriod = e => {
		this.setState({
			allottedPeriod: e.target.value
		});
		this.props.allotPeriod(e.target.value, this.props.tt, this.props.day, this.props.period);
	}

	render() {
		return <select	className="period col"
						style = {{backgroundColor: this.state.bgColor}}
						value = {this.state.allottedPeriod}
						onChange = {e => this.updatePeriod(e)}
						onClick = {e => this.checkForDelete(e)}
						>
						<option value=""></option>
						{this.state.suggestions}
				</select>

	}
}

const mapStateToProps = state => {
		return state;
};

const mapDispatchToProps = dispatch => {
	return {
		allotPeriod: (value, tt, day, period) => dispatch(allotPeriod(value, tt, day, period))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Period);