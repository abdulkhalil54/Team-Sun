const titleDiv = document.getElementById("title");
const professorName = document.getElementById("professorName");
const applicationsDiv = document.getElementById("applications");

async function render(){
    const res = await fetch("profSectionData.json");
    // const res = await fetch('api/portal/professor');
    if(res.ok){
        const data = await res.json();
        console.log(data)
        professorName.innerText = `${data.firstName} ${data.lastName}`;
         //order of rows is section number, count
        for(let i = 0; i < data.applications.length; i++){
            /*
                <tr>
                    <th scope = "row" class = "top"> <input type="number" name="num" min="1" max="20"><br> </th>
                    <th scope ="row"> Joe Smith </th>
                    <th scope ="row" class = "pending"> Pending</th>
                    <th scope ="row"> <a>Application</a> </th>
                </tr>
            */
            const row = document.createElement("tr");

            const preference = document.createElement("th");
            const studentName = document.createElement("th");
            const status = document.createElement("th");
            const application = document.createElement("th");

            preference.setAttribute("scope", "row");
            preference.classList.add("top");
          
            const input = document.createElement("input");
            input.setAttribute("type", "number");
            input.setAttribute("name", "num");
            input.setAttribute("min", "1");
            input.setAttribute("max", "20");
          
            preference.appendChild(input);
            preference.appendChild(document.createElement("br"));

            studentName.setAttribute("scope", "row");
            status.setAttribute("scope", "row");
            application.setAttribute("scope", "row");

            sectionNumber.innerText = data.applications[i].sectionID;
            sectionCount.innerText = `${data.applications[i].application_num} Applications`;
            row.appendChild(sectionNumber);
            row.appendChild(sectionCount);
            applicationsDiv.appendChild(row);
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
//this renders all the necessary information on the page before the user can interact with it
document.addEventListener("DOMContentLoaded", () => {
    render();
});