const sectionDiv = document.getElementById("sections");
const professorName = document.getElementById("professorName");
async function render(element){
    let data = await fetch("data.json");
    let json = await data.json();
    //order of rows is section number, count
    
}