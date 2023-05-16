const studentName = document.getElementById("student-name");
async function render(){
    const res = await fetch("testData.json");
    if(res.ok){
        //student Name field
        const data = await res.json();
        console.log(data);
        studentName.innerText = `${data.firstName} ${data.lastName}`;

        //order section by preference
        
    }
    else{
        console.log(`Error: ${res.status}`);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    render();
});