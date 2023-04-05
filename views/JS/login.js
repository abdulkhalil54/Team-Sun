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