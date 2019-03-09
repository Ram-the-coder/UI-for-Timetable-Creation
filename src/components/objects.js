class TimeTableObject {
	constructor() {
		this.schedule = Array(5).fill(Array(8));
		this.schedule[0] = ["mpmc", "coca", "", "java", "", "", "", ""];
	}
}

export class FacultyObject {
	constructor(name, subjectsHandled = []) {
		this.name = name;
		this.subjectsHandled = subjectsHandled;
		this.timeTable = new TimeTableObject();
	}
}

export class SectionObject {
	constructor(dept, sem, section) {
		this.dept = dept;
		this.sem = sem;
		this.sec = section
		this.timeTable = new TimeTableObject();
	}
}

export class LabObject	 {
	constructor(dept, name) {
		this.dept = dept;
		this.name = name;
		this.timeTable = new TimeTableObject();
	}
}


