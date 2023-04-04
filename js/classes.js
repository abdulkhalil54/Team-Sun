//user class
class User{
    constructor(username, password, actType){
        this.username = username;
        this.password = password;
        this.actType = actType;
    }
    getUsername(){
        return this.username;
    }
    getPassword(){
        return this.password;
    }
    getAcctType(){
        return this.actType;
    }
    //takes a string of new password
    setPassword(newPassword){
        this.password = newPassword;
    }
}

//student class
class Student extends User{
    constructor(username,password,actType,conflictSec,preferences,application){
        super(username,password,actType);
        this.conflictSec = conflictSec;
        this.preferences = preferences;
        this.application = application;
    }
    getApplication(){
        return this.application;
    }
}

//professor
class Professor extends User{
    constructor(username,password,actType,sections, preferences){
        super(username,password,actType);
        this.sections = sections;
        this.preferences = preferences;
    }
    getSections(){
        return this.sections;
    }
    getPreferences(){
        return this.preferences;
    }
}

//section
class Section{
    constructor(secNum, day, time, professor, capacity, numErolled){
        this.secNum = secNum;
        this.day = day;
        this.time = time;
        this.professor = professor;
        this.capacity = capacity;
        this.numErolled = numErolled;
    }
    getSecnum(){
        return this.secNum;
    }
    getDay(){
        return this.day;
    }
    getTime(){
        return this.time;
    }
    getProfessor(){
        return this.professor;
    }
    getCapacity(){
        return this.capacity;
    }
    getNumEnrolled(){
        return this.numErolled;
    }
    //setter for easy manipulation of numEnrolled
    setNumEnrolled(newErolled){
        this.numErolled = newErolled;
        return this.numErolled;
    }
}

class Application{
    constructor(name, year, gpa, grade, references, resumeID){
        this.name = name;
        this.year = year;
        this.gpa = gpa;
        this.grade = grade;
        this.references = references;
        this.resumeID = resumeID;
    }
    getName(){
        return this.name;
    }
    getYear(){
        return this.year;
    }
    getGrade(){
        return this.grade;
    }
    getReferences(){
        return this.references;
    }
    getResume(){
        return this.resumeID;
    }
}

//takes professor preference list and student preference list and returns result matching
function createMatching(applicationsList, professorsList, sectionsList){
    var numApplicants = applicationsList.length();
    //creates a 2d array of application preferences, applicationPreferences is 2d array
    applciationPreferences =[];
    for(var i=0 ; i < numApplicants ; i++ ){
        applciationPreferences[i] = applicationsList[i].getPreferences();
    }

    var numProfessors = professorsList.length();
    //create 2d array of professor preferences
    professorsPreferences=[];
    for(var j=0;j<numProfessors;j++){
        professorsPreferences[j] = professorsList[j].getPreferences();
    }

    //stable matching problem using G-S algorithm, but with unsymmetrical prefLists



}

function main(){
    var applicationsList = [];
    var professorsList = [];
    var sectionsList = [];
    resMatching = createMatching(applicationsList, professorsList, sectionsList);
}

//calls main function to run the file
main()