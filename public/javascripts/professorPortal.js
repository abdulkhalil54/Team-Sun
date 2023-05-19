const sectionDiv = document.getElementById("sections");
const professorName = document.getElementById("professorName");


async function render(){
    //const res = await fetch("/javascripts/profPortalData.json");
    const res = await fetch('/api/portal/professor', {method: 'GET'});
    if(res.ok){
        const data = await res.json();
        console.log(data)
        professorName.innerText = `${data.firstName} ${data.lastName}`;
         //order of rows is section number, count
        for(let i = 0; i < data.applications.length; i++){
            /*
                <tr>
                    <th scope ="row"> 01 </th>
                    <th scope ="row"> 10 Applications </th>
                </tr>
            */
            let row = document.createElement("tr");
            let sectionNumber = document.createElement("th");
            let sectionCount = document.createElement("th");
            sectionNumber.setAttribute("scope", "row");
            sectionCount.setAttribute("scope", "row");
            sectionNumber.innerText = data.applications[i].sectionID;
            sectionCount.innerText = `${data.applications[i].application_num} Applications`;
            row.appendChild(sectionNumber);
            row.appendChild(sectionCount);
            sectionDiv.appendChild(row);
        }
        // Get all table rows in the sections table
        const tableRows = document.querySelectorAll("#sections tr");
        // Loop through each table row and add a click event listener
        tableRows.forEach(row => {
            row.addEventListener("click", async () => {
                // Get the section ID from the first cell in the row
                const sectionID = row.cells[0].innerText;

                // Construct the URL for the new page using the section ID
                const url = `api/redirect/portal/professor/section/${sectionID}`;
                await fetch(url);
                // Navigate to the new page
                window.location.href = url;
            });
        });
    }
    else{
        console.log(`Error: ${res.status}`);
    }
}

function signOutFunc(event){
    event.preventDefault();
    fetch('/logout', {
        method: 'GET',
    })
    .then(res => {
        console.log(res);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

//this renders all the necessary information on the page before the user can interact with it
document.addEventListener("DOMContentLoaded", () => {
    render();
});