const nameInput = document.getElementById("name");
const yearInput = document.getElementById("year");
const referenceName = document.getElementById("reference_name");
const referenceContact = document.getElementById("reference_contact");
const gradeInput = document.getElementById("grade");
const fileFiled = document.getElementById("fileAttachment");
const viewResume = document.getElementById("view");
async function render(){
    const userName = window.location.href.split("/")[window.location.href.split("/").length - 1];
    const res = await fetch(`/api/application/view/${userName}`);
    if(res.ok){
        const data = await res.json();
        console.log(data)
        nameInput.value = data.name;
        nameInput.disabled = true;

        yearInput.value = data.year;
        yearInput.disabled = true;
        
        referenceName.value = data.referencename;
        referenceName.disabled = true;

        referenceContact.value = data.referencecontact;
        referenceContact.disabled = true;

        gradeInput.value = data.grade;    
        gradeInput.disabled = true;

        viewResume.addEventListener("click", async () => {
            window.open(data.attachment, '_blank');
        });

    }else{
        console.log(`Error: ${res.status}`);
    }
}


//this renders all the necessary information on the page before the user can interact with it
document.addEventListener("DOMContentLoaded", () => {
    render();
});