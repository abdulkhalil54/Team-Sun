const titleDiv = document.getElementById("title");
const professorName = document.getElementById("professorName");
const applicationsDiv = document.getElementById("applications");
const submitButton = document.getElementById("submit");

async function render(){
    const res = await fetch("profSectionData.json");
    // const res = await fetch('api/portal/professor');
    if(res.ok){
        const data = await res.json();
        console.log(data)
        console.log(`${data.firstName} ${data.lastName}`)
        professorName.innerText = `${data.firstName} ${data.lastName}`;
        titleDiv.innerHTML = `<h1> Section ${data.section} </h1>`;
        if(data.students.length === 0){
            submitButton.disabled = true;
        }
        else{
            submitButton.disabled = false;
        }
         //order of rows is section number, count
        for(let i = 0; i < data.students.length; i++){
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

            studentName.innerText = `${data.students[i].firstName} ${data.students[i].lastName}`;
            const username = data.students[i].username; // Retrieve the username from your data source
            studentName.setAttribute("data-username", username);
            
            if(data.students[i].status === 0){
                status.classList.add("pending");
                status.innerText = "Pending";
            }else if(data.students[i].status === 1){
                status.classList.add("accepted");
                status.innerText = "Accepted";
            }else if(data.students[i].status === -1){
                status.classList.add("declined");
                status.innerText = "Declined";
            }

            const applicationLink = document.createElement("a");
            applicationLink.innerText = "Application";

            applicationLink.addEventListener("click", async () => {
                const username = data.students[i].username; // Retrieve the username from your data source

                try {
                    const response = await fetch(`api/redirect/application/view/${username}`);
                    if (response.ok) {
                    // Handle the successful response
                    console.log("Fetch request successful");
                    } else {
                    // Handle the error response
                    console.log("Error: Fetch request failed");
                    }
                } catch (error) {
                    // Handle any network or fetch-related errors
                    console.log("Error: Fetch request failed", error);
                }
            });
            application.appendChild(applicationLink);

            row.appendChild(preference);
            row.appendChild(studentName);
            row.appendChild(status);
            row.appendChild(application);
            applicationsDiv.appendChild(row);
        }
    }
    else{
        console.log(`Error: ${res.status}`);
    }
}
//this renders all the necessary information on the page before the user can interact with it
document.addEventListener("DOMContentLoaded", () => {
    render();
});


submitButton.addEventListener("click", async () => {
    const tbody = document.getElementById("applications");
    const rows = tbody.querySelectorAll("tr");
    let preferences = [];
    const preferenceCount = {}; // Object to keep track of preference counts
    for (let i = 0; i < rows.length; i++) {
        const input = rows[i].querySelector("input[name='num']");
        const preferenceValue = parseInt(input.value);

        if (!preferenceValue || preferenceValue < 1) { //this checks if the pref value is valid
            alert(`Please enter a valid preference for ${rows[i].querySelector("th:nth-child(2)").innerText}`);
            preferences = [];
            break;

        }else if( preferenceValue > rows.length){ //this checks if the pref value is valid for the range 1 - rows.length
            alert(`Please enter a valid preference in the range of 1-${rows.length} for ${rows[i].querySelector("th:nth-child(2)").innerText}`);
            preferences = [];
            break;

        }else if (preferenceCount[preferenceValue]) { //this checks if the pref value has already been used
            alert(`You used the preference ${preferenceValue} more than once`);
            preferences = [];
            break;

        } else {
            preferenceCount[preferenceValue] = 1;
            const studentName = rows[i].querySelector("th:nth-child(2)").innerText;
            const username = rows[i].querySelector("th:nth-child(2)").getAttribute("data-username");
            preferences.push({username: username, studentName: studentName, preference: preferenceValue})
        }
    }
    console.log(preferences);
});
