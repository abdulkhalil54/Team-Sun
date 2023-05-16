//Make sure the entire page is loaded before submit button click
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('applicationForm');
    const submitBtn = document.getElementById('submitBtn');
    
    //Manually create a function that checks Radio checkbox sections.
    const timePreferenceError = document.getElementById('timePreferenceError');
    const sectionRadioGroups = [
      document.getElementsByName('section1_time'),
      document.getElementsByName('section2_time'),
      document.getElementsByName('section3_time'),
      document.getElementsByName('section4_time'),
    ];
    //Function to validate Time preferences are all selected
    function validateTimePreferences() {
      for (const radioGroup of sectionRadioGroups) {
        let isChecked = false;
        for (const radioButton of radioGroup) {
          if (radioButton.checked) {
            isChecked = true;
            break;
          }
        }
        if (!isChecked) return false;
      }
      return true;
    }

    const fileAttachmentError = document.getElementById('fileAttachmentError');
    function validateFileAttachment() {
        return fileAttachment.files.length > 0;
    }
    
    
    submitBtn.addEventListener('click', async function (event) {
      event.preventDefault();
      //If validated time, then it will not display error, else display
      if (!validateTimePreferences()) {
        timePreferenceError.style.display = 'inline';
      } else {
        timePreferenceError.style.display = 'none';
      }
      //Validate file attachment
      if (!validateFileAttachment()) {
        fileAttachmentError.style.display = 'inline';
      } else {
        fileAttachmentError.style.display = 'none';
      }
      //If either fail do not go through with a fetch request
      if (!validateTimePreferences() || !validateFileAttachment()) {
        return;
      }

      //Create new form data
      const formData = new FormData(form);
  
      try {
        console.log("WWWW");
        const response = await fetch('/api/application/submit', {
          method: 'POST',
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        // Process the response, for example, by redirecting or displaying a success message
        console.log('Form submitted successfully');
      } catch (error) {
        console.error('Error submitting the form:', error);
      }
    });
  });