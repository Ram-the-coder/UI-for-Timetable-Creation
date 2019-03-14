import { SectionObject, LabObject, FacultyObject } from '../objects';

// ACTION TYPES
export const ALLOT_PERIOD = "allot_period";

export const allotPeriod = (value, tt, day, period) => {
	return {
		type: ALLOT_PERIOD,
		tt,
		value,
		day,
		period
	}
}


// REDUCERS

const initialState = {
	classes: {
		// deptSemSec: [],
		cse3a: new SectionObject("cse",3,"a"),
		cse3b: new SectionObject("cse",3,"b"),
		it3a: new SectionObject("it",3,"a"),
		it3b: new SectionObject("it",3,"b"),
		mech3a: new SectionObject("mech",3,"a"),
		mech3b: new SectionObject("mech",3,"b"),
		cse1a: new SectionObject("cse",1,"a"),
		cse1b: new SectionObject("cse",1,"b"),
		it1a: new SectionObject("it",1,"a"),
		it1b: new SectionObject("it",1,"b"),
		mech1a: new SectionObject("mech",1,"a"),
		mech3b: new SectionObject("mech",1,"b"),
	},
	labs: {
		// deptLab: [],
		csempmc: new LabObject("cse", "mpmc lab", "mpmc lab"),
		cselab3: new LabObject("cse", "java lab", "ctv lab 3"),
	},
	faculties: {
		johnDoe: new FacultyObject("John Doe"),
		janeDoe: new FacultyObject("Jane Doe"),
	},
	subjects: ["mpmc", "coca", "java"],
	semesters: ["Semester 1", "Semester 3"],
	depts: ["cse", "it", "mech"],
	sections: ["A", "B"],
}

export const rootReducer = (state = initialState, action) => {


	switch(action.type) {
		case ALLOT_PERIOD: 
			let type, id;
			console.log(state);
			if(action.tt.type === "Class Timetable") {
				type = "classes";
				id = action.tt.dept + action.tt.sem + action.tt.sec.toLowerCase();
			}
			else if(action.tt.type === "Lab Timetable") {
				type = "labs";
				const labKeys = Object.keys(state.labs);
				for( let i = 0; i < labKeys.length; i++) {
					if(state.labs[labKeys[i]].labName === action.tt.lab) {
						id = labKeys[i];
						break;
					}
				}
			}
			else {
				type = "faculties";
				const facultyKeys = Object.keys(state.faculties);
				for( let i = 0; i < facultyKeys.length; i++) {
					if(state.faculties[facultyKeys[i]].name === action.tt.faculty) {
						id = facultyKeys[i];
						break;
					}
				}
			}
			const cloneState = JSON.parse(JSON.stringify(state));
			let ownStatus, neighbourStatus, neighbour;

			neighbour = (action.period % 2 === 0) ? action.period + 1 : action.period - 1;

			if(action.value.match(/lab/) || action.tt.type === "Lab Timetable") {
				ownStatus = neighbourStatus = "allotted";	
				cloneState[type][id].timeTable.schedule[action.day][neighbour].text = action.value;
			}
			else {
				if(action.value === "") { //if current period is unallotted
					if(cloneState[type][id].timeTable.schedule[action.day][action.period].text.match(/lab/)) {
						cloneState[type][id].timeTable.schedule[action.day][neighbour].text = "";			
						ownStatus = neighbourStatus = "consecutive";
					}
					else if(cloneState[type][id].timeTable.schedule[action.day][neighbour].text === "") {  //if neighbour is unallotted
						ownStatus = neighbourStatus = "consecutive";
					}
					else //if neighbour is allotted
						ownStatus = "isolated";
				} 
				else { //if current period is allotted
					ownStatus = "allotted";
					if(cloneState[type][id].timeTable.schedule[action.day][neighbour].text === "") //if neighbour is unallotted
						neighbourStatus = "isolated";
				}
			}
			cloneState[type][id].timeTable.schedule[action.day][action.period].text = action.value;
			cloneState[type][id].timeTable.schedule[action.day][action.period].status = ownStatus;
			
			cloneState[type][id].timeTable.schedule[action.day][neighbour].status = neighbourStatus;

			return cloneState;
			break;
			
		default: return state;
	}
}