import { SectionObject, LabObject, FacultyObject } from '../objects';

// ACTION TYPES



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
		cseMpmc: new LabObject("cse", "mpmc"),
		cseLab3: new LabObject("cse", "lab3"),
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

const rootReducer = (state = initialState, action) => {
	return state
}

export default rootReducer;