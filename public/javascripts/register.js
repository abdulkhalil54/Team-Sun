const register_button = document.getElementById("registerButton");

register_button.addEventListener('click', (event) => {
    event.preventDefault();
    
    // Retrieve the input fields from the form submission
    const username = document.getElementById("username").value; //50 char limit
    const password = document.getElementById("password").value; //72 char limit
    const firstName = document.getElementById("fname").value; //50 char limit
    const lastName = document.getElementById("lname").value; //50 char limit
    let role = document.getElementById("role").value; // 1 or 0
    console.log(username, password, firstName, lastName, role)
    const vals = {Username: username, Password: password, FirstName: firstName, LastName: lastName};
    const tooLongVals = [];
    const noInput = [];
    for (const key in vals) {
        const maxLength = (key === "password") ? 72 : 50;
        const val = vals[key];
        if (val.length > maxLength) {
          tooLongVals.push(key);
        }
        else if(val.length  == 0){
            noInput.push(key);
        }
    }
    if (tooLongVals.length !== 0) {
        let prevWarning = document.getElementById("warningDiv");
        if (prevWarning) {
          prevWarning.remove();
        }
        let areaToAddWarning = document.getElementById("role");
        let warning = document.createElement("div");
        warning.setAttribute("id", "warningDiv");
        warning.innerHTML = `<h1> ${tooLongVals.length === 1 ? tooLongVals[0] + " is too long!" : tooLongVals.join(", ") + " are too long!"}</h1>`;
        areaToAddWarning.insertAdjacentElement("afterend", warning);
    } 
    else if(noInput.length !== 0) {
        let prevWarning = document.getElementById("warningDiv");
        if (prevWarning) {
          prevWarning.remove();
        }
        let areaToAddWarning = document.getElementById("role");
        let warning = document.createElement("div");
        warning.setAttribute("id", "warningDiv");
        warning.innerHTML = `<h1> Please input a ${noInput.join(", ")}!</h1>`;
        areaToAddWarning.insertAdjacentElement("afterend", warning);
    }
    else {
        let warning = document.getElementById("warningDiv");
        if (warning) {
            warning.remove();
        }
        if (role === "0") {
            role = false;
        } 
        else {
            role = true;
        }
            // Send a POST request to the server to check if the user is authenticated
        fetch('/register', {
            method: 'POST',
            body: JSON.stringify({ username, password, firstName, lastName, role}),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            if (response.ok) {
              // User authenticated, redirect to a different page
              //window.location.href = '../views/applicationForm.html';
              console.log("SUCCESSFUL REGISTRATION");
            }else if(response.status === 409) {
              alert('Username already exists');
            }else if(response.status === 400){
              alert('Error giving your data to the server, try inputing something else?');
            }else{
              alert(`Recieved status code: ${response.status}`);
            }
          })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});