const register_button = document.getElementById("registerButton");

register_button.addEventListener('click', (event) => {
    event.preventDefault();
    
    // Retrieve the input fields from the form submission
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;

        // Send a POST request to the server to check if the user is authenticated
    fetch('/register', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
        if (response.ok) {
        // User authenticated, redirect to a different page
        //window.location.href = '../views/applicationForm.html';
        console.log("SUCCESSFUL REGISTRATION");
        } else {
        // Authentication failed, show an error message
        alert('Invalid username or password');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});