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
		cse4a: new SectionObject("cse",4,"a"),
		cse4d: new SectionObject("cse",4,"d"),
	},
	labs: {
		// deptLab: [],
		cseMpmc: new LabObject("cse", "mpmc", "mpmc lab"),
		cseLab3: new LabObject("cse", "lab3", "ctv lab 3"),
	},
	faculties: {
		johnDoe: new FacultyObject("JohnDoe"),
		janeDoe: new FacultyObject("JaneDoe"),
	},
	subjects: ["mpmc", "coca", "java"],
	semesters: [1,2,3,4],
	depts: ["cse", "it", "mech"],
	sections: ["A", "B", "C", "D", "E"],
}

export const rootReducer = (state = initialState, action) => {
	console.log(action);
	switch(action.type) {
		case ALLOT_PERIOD: 
			const id = action.tt.dept + action.tt.sem + action.tt.sec.toLowerCase();
			const cloneState = JSON.parse(JSON.stringify(state));
			let ownStatus, neighbourStatus, neighbour;

			neighbour = (action.period % 2 === 0) ? action.period + 1 : action.period - 1;

			if(action.value.match(/lab/)) {
				ownStatus = neighbourStatus = "allotted";	
				cloneState.classes[id].timeTable.schedule[action.day][neighbour].text = action.value;
			}
			else {
				if(action.value === "") { //if current period is unallotted
					if(cloneState.classes[id].timeTable.schedule[action.day][action.period].text.match(/lab/)) {
						cloneState.classes[id].timeTable.schedule[action.day][neighbour].text = "";			
						ownStatus = neighbourStatus = "consecutive";
					}
					else if(cloneState.classes[id].timeTable.schedule[action.day][neighbour].text === "") {  //if neighbour is unallotted
						ownStatus = neighbourStatus = "consecutive";
					}
					else //if neighbour is allotted
						ownStatus = "isolated";
				} 
				else { //if current period is allotted
					ownStatus = "allotted";
					if(cloneState.classes[id].timeTable.schedule[action.day][neighbour].text === "") //if neighbour is unallotted
						neighbourStatus = "isolated";
				}
			}
			cloneState.classes[id].timeTable.schedule[action.day][action.period].text = action.value;
			cloneState.classes[id].timeTable.schedule[action.day][action.period].status = ownStatus;
			
			cloneState.classes[id].timeTable.schedule[action.day][neighbour].status = neighbourStatus;

			return cloneState;
			break;
			
		default: return state;
	}
}