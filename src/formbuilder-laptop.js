// Import templates
const qcblock = document.querySelector('#qc-template');
const headerblock = document.querySelector('#heading-template')
const qcchecks = [
    // Laptop Version 1.0
    { isHeader: true, heading: 'Visual Inspection'},
    { question: 'Case - Scratches/Dents/Cracks'},
    { question: 'Keyboard/Touchpad (scratches, worn out, missing key)'}, // lpt
    { question: 'Cleanliness - Inside/Outside, Stickers Removed'},
    { isHeader: true, heading: 'POST/BIOS/Hardware Verification'},
    { question: 'RAM/DRIVE - Correct specs/Size in OS'},
    { question: 'POST Errors/RAM seated properly'},
    { question: 'CMOS battery and clock'},
    { question: 'BIOS - Password disabled'},
    { question: 'BIOS - Settings reset to factory defaults'},
    { question: 'BIOS - ID tags removed'},
    { question: 'Boot Sequence: HDD/CD/Network'},
    { question: 'Change SATA to AHCI'},
    { isHeader: true, heading: 'Device Operation Verification'},
    { question: 'Correct image loaded onto system'},
    { question: 'Video output (Discolouration, spot, marks)'}, // lpt
    { question: 'Required programs installed (default/add-ons)'},
    { question: 'USB ports - Working'},
    { question: 'Sound/Microphone - Quality'},
    { question: 'Network connection - Available/Working'},
    { question: 'Webcam - Available/Working'}, // lpt
    { question: 'Keyboard/Mouse/Trackpad - Tested/clean/working'}, // lpt
    { question: 'Monitor - Case, Screen, Working'},
    { question: 'Device Manager - No errors'},
    { question: 'CD/DVD Drive(s) - Available/Working'},
    { question: 'Correct Time/Date/Time Zone (EST)'},
    { question: 'Sufficent battery life'}, // lpt
    { question: 'MS Office Activated + Shortcut Pinned'},
    { isHeader: true, heading: 'Final Inspection (to be performed just before package or skid is sealed'},
    { question: 'Visual (cleanliness, screws, disks removed'},
    { question: 'Keyboard/Mouse - Clean/Working'},
    { question: 'Correct charger - Clean/Working'}, // lpt
    { question: 'Items match Sales Order - Verified'}
];

qcchecks.forEach(check => {
    if (check.isHeader == true) {
        const instance = document.importNode(headerblock.content, true);
        instance.querySelector('.heading').innerHTML = check.heading;

        // Append the instance at the DOM
        document.getElementById('qcchecks').appendChild(instance);
    } else {
        // Create an instance of the template content
        const instance = document.importNode(qcblock.content, true);
        instance.querySelector('.question').innerHTML = check.question;
        // const qc1 = instance.querySelector('.qc1-toggle');


        // Append the instance at the DOM
        document.getElementById('qcchecks').appendChild(instance);
    }
});

window.addEventListener("load", () => {
    function sendData() {
      const XHR = new XMLHttpRequest();
  
      // Bind the FormData object and the form element
      const FD = new FormData(form);
  
      // Define what happens on successful data submission
      XHR.addEventListener("load", (event) => {
        alert(event.target.responseText);
      });
  
      // Define what happens in case of error
      XHR.addEventListener("error", (event) => {
        alert("Oops! Something went wrong.");
      });
  
      // Set up our request
      XHR.open("POST",document);
  
      // The data sent is what the user provided in the form
      XHR.send(FD);
    }
  
    // Get the form element
    const form = document.getElementById("laptop-qc-form");
  
    // Add 'submit' event handler
    form.addEventListener("submit", (event) => {
      event.preventDefault();
  
      sendData();
    });
  });
  