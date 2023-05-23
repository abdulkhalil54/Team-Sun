function signOutFunc(event){
    event.preventDefault();
    fetch('/logout', {
        method: 'GET',
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            window.location.href = "/login";
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function newApplication(event){
    event.preventDefault();
    console.log("New appl lciecked");
    fetch('/api/redirect/application/submit', {
        method: 'GET',
    })
    .then(res => {
        if (res.redirected) {
            window.location.replace(res.url)
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });

}

const studentName = document.getElementById("studentname");
const tableBody = document.getElementById("body");
const sectionID = {}

async function render(){
    try{
        const res = await fetch("/api/portal/student", {method: "GET"});
        if(res.ok){
            //student Name field
            const data = await res.json();
            console.log(data);
            studentName.innerText = `${data.firstName} ${data.lastName}`;

            //order section by preference
            for(let i=0;i<data.preferences.length; i++){

                const row = document.createElement("tr");
                // <tr>
                //     <th scope = "row"> 03 </th>
                //     <td> LEC: T/Th 2:30 - 3:45pm; DIS: W 10:00 - 11:00am</td>
                //     <td> Matthew Rattigan</td>
                //     <td id="status-03"> Accepted </td>
                //     <td> mrattigan@umass.edu </td>
                // </tr>
                const sectionID = document.createElement("th");
                const sectionTime = document.createElement("td");
                const Professor = document.createElement("td");
                const status = document.createElement("td");
                const contactEmail = document.createElement("td");

                data.preferences = data.preferences.sort((a,b) => {
                    return parseInt(a.preference) - parseInt(b.preference)
                });

                sectionID.setAttribute("scope", "row");
                sectionID.innerText = data.preferences[i].sectionID;

                sectionTime.setAttribute("scope","row");
                status.setAttribute("scope","row");
                let timeList = [
                    "LEC: T/Th 2:30 - 3:45pm; DIS: W 10:00 - 11:00am",
                    "LEC: M/W 2:30 - 3:45pm; DIS: W 12:20 - 1:10pm",
                    "LEC: T/Th 4:00 - 5:15pm; DIS: W 11:15 - 12:05pm",
                    "LEC: T/Th 8:30 - 9:45am; DIS: W 11:15 - 12:05pm"
                ];
                sectionTime.innerText = timeList[parseInt(data.preferences[i].sectionID)- 1];

                Professor.innerText = `${data.preferences[i].professorfirstName} ${data.preferences[i].professorlastName}`
                
                let statusList = ["application not found","accepted", "rejected", "pending"]
                let statusNum = parseInt(data.preferences[i].status)+1
                status.innerText = statusList[statusNum]

                contactEmail.innerText = data.preferences[i].professorEmail

                row.appendChild(sectionID);
                row.appendChild(sectionTime);
                row.appendChild(Professor);
                row.appendChild(status);
                row.appendChild(contactEmail);
                tableBody.appendChild(row);
            }
        }
        else{
            console.log(`Error: ${res.status}`);
        }
    }
    catch(e){
        console.log(`Error: ${e}`);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    render();
    const sign = document.getElementById("signoutbutton");
    const newApp = document.getElementById("newappbutton");
    sign.addEventListener("click", signOutFunc);
    newApp.addEventListener("click", newApplication);
});