const professorCheckbox = document.querySelector('input[name="professor"]');
const studentCheckbox = document.querySelector('input[name="student"]');
const checkDiv = document.getElementById("checkDiv");

function check() {
  if (professorCheckbox.checked && studentCheckbox.checked) {
      let warning = document.createElement("div");
      warning.setAttribute("id", "warningDiv");
      warning.innerHTML = "<h1>Please check only one checkbox!</h1>";
      checkDiv.insertAdjacentElement("afterend",warning);
  } 
  else {
    let warning = document.getElementById("warningDiv");
      if (warning) {
          warning.remove();
      }
  }
}


professorCheckbox.addEventListener("change", check);
studentCheckbox.addEventListener("change", check);


const login_button = document.querySelector('#login-button');

login_button.addEventListener('click', (event) => {
  event.preventDefault();

  // Retrieve the username and password from the form submission
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  
  // Send a POST request to the server to check if the user is authenticated
  fetch(`/login/${username}/${password}`, {
    method: 'GET'
  })
  .then(response => {
    if (response.ok) {
      // User authenticated, redirect to a different page
      //window.location.href = '../views/applicationForm.html';
      console.log("SUCCESSFUL LOGIN");
    } else {
      // Authentication failed, show an error message
      alert('Invalid username or password');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
});

const register_button = document.querySelector('#register-button');

register_button.addEventListener('click', (event) => {
  event.preventDefault();

  // Retrieve the username and password from the form submission
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  console.log(username, password);
  
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