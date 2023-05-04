function signOutFunc(event){
    event.preventDefault();
    fetch('/logout', {
        method: 'GET',
    })
    .then(res => {
        console.log(res);
        const errorMessageElement = document.querySelector('#errorMessage')
        if(res.redirected) {
            console.log("SHOULD NOT HAPPEN");
            window.location.replace(res.url);
        }
        if (!res.ok) {
            res.json().then(result =>{
                errorMessageElement.innerHTML = result.message
            })
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}