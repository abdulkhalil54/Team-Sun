const login_button = document.querySelector('#login-button');

login_button.addEventListener('click', (event) => {
  event.preventDefault();

  // Retrieve the username and password from the form
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  
  // Send a GET request to the server with the
  // username and password embedded in the request URL 
  // to check if the user is authenticated
  fetch(`/login`, {
    method: 'POST',
    body: JSON.stringify({username, password}),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => {
    console.log(res);
    if (res.redirected) {
      window.location.replace(res.url);
    }
    const errorMessageElement = document.querySelector('#errorMessage')
    if (res.status === 404) {
      res.json().then(result =>{
        errorMessageElement.innerHTML = result.message
      })
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
});

const register_button = document.querySelector('#register-button');

register_button.addEventListener('click', (event) => {
  event.preventDefault();
  window.location.replace("../register")
});