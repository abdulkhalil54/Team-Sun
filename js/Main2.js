/*
SECTIONS HAVE THEIR OWN PREFERENCES, NOT PROFESSORS
section's preferences has students as usernames, not objects
student preferences has sections as sectionID, a unique integer
*/


//classes:

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
    getPreferences() {
        return this.preferences;
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
    constructor(secNum, day, time, professor, capacity, numErolled, sectionID, preferences){
        this.secNum = secNum;
        this.day = day;
        this.time = time;
        this.professor = professor;
        this.capacity = capacity;
        this.numErolled = numErolled;
        this.sectionID = sectionID;
        this.preferences = preferences;
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
    getSectionID() {
        return this.sectionID;
    }
    //setter for easy manipulation of numEnrolled
    setNumEnrolled(newErolled){
        this.numErolled = newErolled;
        return this.numErolled;
    }
    getPreferences() {
        return this.preferences;
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
//matching is by index
function createMatching(studentsList, /*professorsList,*/ sectionsList){
    var numStudents = studentsList.length;
    //creates a 2d array of application preferences, applicationPreferences is 2d array
    let studentPreferences =[];
    for(var i=0 ; i < numStudents ; i++ ){
        studentPreferences[i] = studentsList[i].getPreferences();
    }

    var numSections = sectionsList.length;
    //create 2d array of professor preferences
    let sectionsPreferences=[];
    for(var j=0;j<numSections;j++){
        sectionsPreferences[j] = sectionsList[j].getPreferences();
    }

    /*
        make a directed graph G with all sections and students
        node1 0: source
        node1 1: sink
        nodes 2 - (numSections + 1): sections
        nodes (numNodes - numStudents) - (numNodes - 1): students
        for all students do
            for all sections they are available for do
                have arrow with weight 1 from section to student
            end for
        end for
        create source node1 s, sink node1 t
        for all section nodes i do
            arrow from s to i with weight equal to 1
        end for
        for all student nodes i do
            arrow from i to t with weight equal to 1
        end for
        for all section nodes i do
            for all students j in order of section i’s preference list 0 ≤ x ≤ number of students do
                if there is an edge from section i to student j then
                    place prof value (number of students −x) on that edge
                end if
            end for
        end for
        for all student nodes i do
            for all sections j in order of student j’s preference list 0 ≤ x ≤ number of sections do
                place stud value (number of sections −x on that edge
            end for
        end for
    */
    let numNodes = numSections + numStudents + 2;
    let G = [];
    let Gf = [];
    
    for (let i = 0; i < numNodes; i++) {
        G[i] =[];
        Gf[i] = [];
        for (let j = 0; j < numNodes; j++) {
            if (i === 0) { //i is source
               if (2 <= j && j <= numSections + 1) { //j is section
                    let cap = sectionsList[j - 2].capacity;
                    G[i][j] = {edge: true, weight: cap, profVal: 0, studVal: 0};
                    Gf[i][j] = {edge: true, weight: cap, profVal: 0, studVal: 0};
                }
                else { //j is source, student, or sink
                    G[i][j] = {edge: false};
                    Gf[i][j] = {edge: false};
                }
            }
            else if (2 <= i && i <= numSections + 1) { //i is section
                if (j === 0) { //j is source
                    G[i][j] = {edge: false};
                    Gf[i][j] = {edge: true, weight: 0, profVal: 0, studVal: 0};
                }
                else if ((numNodes - numStudents <= j && j <= numNodes - 1) && (contains(studentPreferences[j - numNodes + numStudents], sectionsList[i - 2].getSectionID()))) { //j is student connected to i
                    let proVal = numStudents - getIndex(sectionsPreferences[i - 2], studentsList[j - numNodes + numStudents].getUsername());
                    let stuVal = numSections - getIndex(studentPreferences[j - numNodes + numStudents], sectionsList[i - 2].getSectionID());
                    G[i][j] = {edge: true, weight: 1, profVal: proVal, studVal: stuVal};
                    Gf[i][j] = {edge: true, weight: 1, profVal: proVal, studVal: stuVal};
                }
                else { //j is section, student not connected to i
                    G[i][j] = {edge: false};
                    Gf[i][j] = {edge: false};
                }
            }
            else if ((numNodes - numStudents) <= i && i <= numNodes - 1) { //i is student
                if ((2 <= j && j <= numSections + 1) && (contains(studentPreferences[i - numNodes + numStudents], sectionsList[j - 2].getSectionID()))) { //j is section connected to student
                    let proVal = - (numStudents - getIndex(sectionsPreferences[j - 2], studentsList[i - numNodes + numStudents].getUsername()));
                    let stuVal = - (numSections - getIndex(studentPreferences[i - numNodes + numStudents], sectionsList[j - 2].getSectionID()));
                    G[i][j] = {edge: false};
                    Gf[i][j] = {edge: true, weight: 0, profVal: proVal, studVal: stuVal};
                }
                else if (j === 1) { //j is sink
                    G[i][j] = {edge: true, weight: 1, profVal: 0, studVal: 0};
                    Gf[i][j] = {edge: true, weight: 1, profVal: 0, studVal: 0};
                }
                else { //j is source, section not connected to i, or student
                    G[i][j] = {edge: false};
                    Gf[i][j] = {edge: false};
                }
            }
            else { //i is sink
                if (numNodes - numStudents <= j && j <= numNodes - 1) { //j is student
                    G[i][j] = {edge: false};
                    Gf[i][j] = {edge: true, weight: 0, profVal: 0, studVal: 0};
                }
                else { //j is anything other than student
                    G[i][j] = {edge: false};
                    Gf[i][j] = {edge: false};
                }
            }
        }
    }
    let matching = [];
    for (let i = 0; i < numSections; i++) {
        matching[i] = [];
    }
    /*
    while there exists an s − t path P in Gf (priority to highest path value (prof first, then stud)) do
        f = Augment(f, P )
        update Gf
    end while
    */
    let p = bellFordAd(Gf, numNodes, 0, 1);
    while (p.length !== 0) {
        //check for repeats
        let pContains = []
        let newP = [];
        for (let i = 0; i < p.length; i++) {
            if (contains(pContains, p[i])) {
                let before = getIndex(newP, p[i]); //check out
                newP = append1(newP, p[before + 1]);
                newP = append1(newP, 1);
                p = newP;
                break;
            }
            newP = append1(newP, p[i]);
        }
        let prev = 0;
        Gf[0][p[0]].weight = Gf[0][p[0]].weight - 1;
        Gf[p[0]][0].weight = Gf[p[0]][0].weight + 1;
        /*if (p.length === 3) {
            Gf[p[0]][p[1]].weight = Gf[p[0]][p[1]].weight - 1;
            Gf[p[1]][p[0]].weight = Gf[p[1]][p[0]].weight + 1;
            matching[p[0]].append1(p[1]);
        }*/
        for (let i = 0; i < p.length - 1; i++) {
            Gf[p[i]][p[i + 1]].weight = Gf[p[i]][p[i + 1]].weight - 1;
            Gf[p[i + 1]][p[i]].weight = Gf[p[i + 1]][p[i]].weight + 1;
            if (i % 2 === 0) {
                matching[p[i] - 2] = append1(matching[p[i] - 2], p[i+1]);
            }
            else if (i !== p.length - 2) {
                let index = matching[p[i + 1] - 2].indexOf(p[i]);
                if (index === 0) {
                    newArr = [];
                    for (let ij = 1; ij < matching[p[i+1]-2].length; ij++) {
                        newArr[ij - 1] = matching[p[i+1]-2][ij];
                    }
                    matching[p[i + 1] - 2] = newArr;
                }
                else {
                    matching[p[i + 1] - 2].splice(index, index);
                }
            }
        }
        p = bellFordAd(Gf, numNodes, 0, 1);
    }
    let notEnough = "Not enough students applied for ";
    for (let i = 0; i < matching.length; i++) {
        if (matching[i].length !== sectionsList[i].capacity) {
            notEnough = notEnough + "Section " + sectionsList[i].secNum + ", ";
        }
    }
    if (notEnough !== "Not enough students applied for ") {
        return notEnough;
    }
    matchingID = [];
    for (let i = 0; i < matching.length; i++) {
        matchingID[i] = [];
        for (let j = 0; j < matching[i].length; j++) {
            matchingID[i][j] = studentsList[matching[i][j] - numNodes + numStudents].getUsername();
        }
    }
    return matchingID; //change to be username instead of integer; also if there are not enough students: send something else
}

function bellFordAd(G, n, s, t) {
    let M = [];
    let path = [];
    path[0] = [];
    M[0] = [];
    for (let i = 0; i < n; i++) {
        M[0][i] = {profVal: -Infinity, studVal: -Infinity};
        path[0][i] = [];
    }
    M[0][t] = {profVal: 0, studVal: 0};
    for (let i = 1; i < n; i++) {
        M[i] = [];
        path[i] = [];
        for (let j = 0; j < n; j++) {
            path[i][j] = path[i-1][j];
            M[i][j] = {profVal: M[i-1][j].profVal, studVal: M[i-1][j].studVal};
            for (let k = 0; k < n; k++) {
                if (G[j][k].edge === true) {
                    if (G[j][k].weight != 0) {
                        if (M[i][j].profVal === G[j][k].profVal + M[i-1][k].profVal) {
                            if (M[i][j].studVal < G[j][k].studVal + M[i-1][k].studVal) {
                                path[i][j] = path[i-1][k];
                                path[i][j] = prepend(path[i][j], k);
                                M[i][j] = {profVal: G[j][k].profVal + M[i-1][k].profVal, studVal: G[j][k].studVal + M[i-1][k].studVal};
                            }
                        }
                        else if (M[i][j].profVal < G[j][k].profVal + M[i-1][k].profVal) {
                            path[i][j] = path[i-1][k];
                            path[i][j] = prepend(path[i][j], k);
                            M[i][j] = {profVal: G[j][k].profVal + M[i-1][k].profVal, studVal: G[j][k].studVal + M[i-1][k].studVal};
                        }
                    }
                }
            }
        }
    }
    return path[n-1][s];
}


function prepend(list, item) {
    let newList = list.slice();
    newList.unshift(item);
    return newList;
}

function append1(arr, val) {
    let arr2 = [];
    for (let i = 0; i <= arr.length; ++i) {
      if (i < arr.length) {
        arr2[i] = arr[i];
      }
      else {
        arr2[i] = val;
      }
    }
    return arr2;
}

function getIndex(list, item) {
    for (let i = 0; i < list.length; i++) {
        if (item === list[i]) {
            return i;
        }
    }
    return -1;
}

function contains(arr, obj) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === obj) {
            return true;
        }
    }
    return false;
}


//testing

/*let app1 = new Application("Segev", 2024, 4.0, "Junior", "references", 2);
let stud1 = new Student("segev5115", "passw0rd", "Student", [5, 6], [1, 2, 3, 4], app1);
let app2 = new Application("Bill", 2024, 4.0, "Junior", "ref", 2);
let stud2 = new Student("bill", "p", 1, 1, [2, 3, 6, 4, 5], app2);
let stud3 = new Student("abdul", "p", 1, 1, [5, 1, 6], 1);
let stud4 = new Student("brian", "p", 1, 1, [6, 1, 3, 4], 1);
let stud5 = new Student("chinguun", "p", 1, 1, [5, 6, 4, 1], 1);
let stud6 = new Student("lucy", "p", 1, 1, [5, 6], 1);
let stud7 = new Student("chang", "p", 1, 1, [3, 5, 4, 2], 1);
let stud8 = new Student("ash", "p", 1, 1, [6, 3, 2], 1);
let students = [stud1, stud2, stud3, stud4, stud5, stud6, stud7, stud8];


let sec1 = new Section(1, "Tuesday", "2:30", "Rattigan", 2, 1, 1, ["segev5115", "abdul", "brian", "chinguun"]);
let sec2 = new Section(2, "T", 1, "R", 1, 0, 2, ["ash", "chang", "bill", "segev5115"]);
let sec3 = new Section(3, "T", 1, "R", 0, 0, 3, ["brian", "ash", "chang", "bill", "segev5115"]);
let sec4 = new Section(4, "W", 1, "JD", 2, 0, 4, ["segev5115", "brian", "bill", "chinguun", "chang"]);
let sec5 = new Section(5, "F", 2, "JD", 0, 0, 5, ["bill", "abdul", "chinguun", "lucy", "chang"]);
let sec6 = new Section(6, "M", 12, "MR", 3, 0, 6, ["abdul", "brian", "chinguun", "lucy", "ash", "bill"]);

let sections = [sec1, sec2, sec3, sec4, sec5, sec6];

let match = createMatching(students, sections);

let app1 = new Application("Segev", 2024, 4.0, "Junior", "references", 2);
let stud1 = new Student("segev5115", "passw0rd", "Student", [5, 6], [1, 2, 3, 4], app1);
let app2 = new Application("Bill", 2024, 4.0, "Junior", "ref", 2);
let stud2 = new Student("bill", "p", 1, 1, [2, 3, 4, 5], app2);
let stud3 = new Student("abdul", "p", 1, 1, [5, 6], 1);
let stud4 = new Student("brian", "p", 1, 1, [6, 1, 3, 4], 1);
let stud5 = new Student("chinguun", "p", 1, 1, [5, 6, 4, 1], 1);
let stud6 = new Student("lucy", "p", 1, 1, [5, 4], 1);
let stud7 = new Student("chang", "p", 1, 1, [3, 5, 4, 2], 1);
let stud8 = new Student("ash", "p", 1, 1, [3, 2], 1);
let students = [stud1, stud2, stud3, stud4, stud5, stud6, stud7, stud8];


let sec1 = new Section(1, "Tuesday", "2:30", "Rattigan", 2, 1, 1, ["segev5115", "brian", "chinguun"]);
let sec2 = new Section(2, "T", 1, "R", 1, 0, 2, ["ash", "chang", "bill", "segev5115"]);
let sec3 = new Section(3, "T", 1, "R", 0, 0, 3, ["brian", "ash", "chang", "bill", "segev5115"]);
let sec4 = new Section(4, "W", 1, "JD", 2, 0, 4, ["segev5115", "lucy", "brian", "bill", "chinguun", "chang"]);
let sec5 = new Section(5, "F", 2, "JD", 0, 0, 5, ["bill", "abdul", "chinguun", "lucy", "chang"]);
let sec6 = new Section(6, "M", 12, "MR", 3, 0, 6, ["abdul", "brian", "chinguun"]);

let sections = [sec1, sec2, sec3, sec4, sec5, sec6];

let match = createMatching(students, sections);


/*let app1 = new Application("Segev", 2024, 4.0, "Junior", "references", 2);
let stud1 = new Student("segev5115", "passw0rd", "Student", [5, 6], [1, 2], app1);
let app2 = new Application("Bill", 2024, 4.0, "Junior", "ref", 2);
let stud2 = new Student("lucy", "p", 1, 1, [2, 1], app2);
let stud3 = new Student("abdul", "p", 1, 1, [3], 1);
let stud4 = new Student("brian", "p", 1, 1, [4], 1);

let sec1 = new Section(1, "Tuesday", "2:30", "Rattigan", 1, 0, 1, ["lucy", "segev5115"]);
let sec2 = new Section(2, "T", 1, "R", 1, 0, 2, ["segev5115", "lucy"]);
let sec3 = new Section(3, "T", 1, "R", 1, 0, 3, ["abdul"]);
let sec4 = new Section(4, "W", 1, "JD", 1, 0, 4, ["brian"]);

let match = createMatching([stud1, stud2, stud3, stud4], [sec1, sec2, sec3, sec4]);


console.log(match);*/