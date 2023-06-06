// Import templates
const qcblock = document.querySelector('#qc-template');
const headerblock = document.querySelector('#heading-template')
const qcchecks = [
    // Desktop Version 1.0
    { isHeader: true, heading: 'Visual Inspection'},
    { question: 'Case - Scratches/Dents/Cracks' },
    { question: 'Cleanliness - Inside/Outside, Stickers Removed'},
    { isHeader: true, heading: 'POST/BIOS/Hardware Verification'},
    { question: 'RAM/DRIVE - Correct specs/Size in OS'},
    { question: 'POST Errors/RAM seated properly'},
    { question: 'CMOS battery and clock'},
    { question: 'BIOS - Settings reset to factory defaults'},
    { question: 'BIOS - ID tags removed'},
    { question: 'Boot Sequence: HDD/CD/Network'},
    { isHeader: true, heading: 'Device Operation Verification'},
    { question: 'Correct image loaded onto system'},
    { question: 'Required programs installed (default/add-ons)'},
    { question: 'USB ports - Working'},
    { question: 'Sound/Microphone - Quality'},
    { question: 'Network connection - Available/Working'},
    { question: 'Webcam - Available/Working'},
    { question: 'Monitor - Case, Screen, Working'},
    { question: 'Device Manager - No errors'},
    { question: 'CD/DVD Drive(s) - Available/Working'},
    { question: 'Correct Time/Date/Time Zone (EST)'},
    { question: 'MS Office Activated + Shortcut Pinned'},
    { isHeader: true, heading: 'Final Inspection (to be performed just before package or skid is sealed'},
    { question: 'Visual (cleanliness, screws, disks removed'},
    { question: 'Keyboard/Mouse - Clean/Working'},
    { question: 'Correct connectors/adapters - Clean/Working'},
    { question: 'Items match Sales Order - Verified'}
];

const reader = new FileReader();

// Event listeners
const qcform = document.querySelector("#desktop-qc-form");
qcform.addEventListener("submit", handleFormSubmit);

const upform = document.querySelector('#upload-form');
upform.addEventListener("submit", handleFileSelect);

let qno = 0;

qcchecks.forEach(check => {

    if (check.isHeader == true) {
        const instance = document.importNode(headerblock.content, true);
        instance.querySelector('.heading').innerHTML = check.heading;

        // Append the instance at the DOM
        document.getElementById('qcchecks').appendChild(instance);
    } else {
        // Create an instance of the template content
        qno += 1;
        const instance = document.importNode(qcblock.content, true);
        instance.querySelector('.question').innerHTML = check.question;

        //qname = check.question.split(/[^a-z]i/)[0];
        //console.log(qname)
        let qname = check.question;

        // Use query check names to describe each group of buttons
        instance.querySelector('#qc1-toggle').setAttribute("name", qname + "_qc1");
        instance.querySelector('#qc2-toggle').setAttribute("name", qname + "_qc2");

        // Redefine the 'name' property of each button in the instance and increment

        instance.querySelector('#qc1-pass').setAttribute("name", "q" + JSON.stringify(qno) + "_qc1");
        instance.querySelector('#qc1-fail').setAttribute("name", "q" + JSON.stringify(qno) + "_qc1");
        instance.querySelector('#qc1-na').setAttribute("name", "q" + JSON.stringify(qno) + "_qc1");

        instance.querySelector('#qc2-pass').setAttribute("name", "q" + JSON.stringify(qno) + "_qc2");
        instance.querySelector('#qc2-fail').setAttribute("name", "q" + JSON.stringify(qno) + "_qc2");
        instance.querySelector('#qc2-na').setAttribute("name", "q" + JSON.stringify(qno) + "_qc2");


        // const qc1 = instance.querySelector('.qc1-toggle');


        // Append the instance at the DOM
        document.getElementById('qcchecks').appendChild(instance);
    }
});

function handleFormSubmit(event) {
    event.preventDefault();

    const data = new FormData(event.target);

    for (let i = 1; i < 30; i++) {
        data.delete("q" + i + "_qc1");
        data.delete("q" + i + "_qc2");
    }

    const formJSON = Object.fromEntries(data.entries());    

    formJSON.qc1 = mapQCdata("qc1");
    formJSON.qc2 = mapQCdata("qc2");

    console.log(JSON.stringify(formJSON, null, 2));

    saveFile(formJSON);
}

function mapQCdata(qcno) {
    let qmap = new Map();
    let qcheck = 0;
    qcchecks.forEach(check => {


        if (check.question != undefined && check.question != null){
            qcheck += 1;
            let qname = "q" + JSON.stringify(qcheck) + "_" + qcno;

            let selectedv = "";            
            let buttons = document.getElementsByName(qname);

            if (buttons[0].checked) {
                selectedv = "PASS"
            }
            if (buttons[1].checked) {
                selectedv = "FAIL"
            }
            if (buttons[2].checked) {
                selectedv = "N/A"
            }

            qmap[check.question] = selectedv;
            //console.log(JSON.stringify(qmap));
        }
    });
    
    return JSON.stringify(qmap);
}

// Code to save JSON as file
function saveFile(obj) {
    let data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));

    let fileName = '"download="qcdata-' + obj["itemserial"];
    
    document.querySelector("#downloadLink").innerHTML = '<a class="btn btn-outline-primary" href="data:' + data + fileName + '.json" role="button">download</a>';
}

// Code to upload JSON file to autofill form
function handleFileSelect(event) {
    event.preventDefault();
    const selectedFile = event.target[0].files[0];
    if (selectedFile) {
        reader.addEventListener("load", handleFileLoad);
        reader.readAsText(selectedFile);
    }
}

function handleFileLoad(event) {
    console.log(event);
    
    if (event.type === "load") {
        console.log(reader.result);

        const data = JSON.parse(reader.result);

        formAutofill(data);
    }
}


function formAutofill(data) {
    const qcsheet = document.querySelector("#desktop-qc-form");
    const qcJSON = Object.fromEntries(new FormData(qcsheet).entries());
    console.log(qcJSON);

    // Version 1.1 with hard coded element references
    qcsheet.elements["buildlocation"].value = data["buildlocation"];
    qcsheet.elements["qc1initial"].value = data["qc1initial"];
    qcsheet.elements["qc2initial"].value = data["qc2initial"];
    qcsheet.elements["assemblydate"].value = data["assemblydate"];
    qcsheet.elements["salesorder"].value = data["salesorder"];
    qcsheet.elements["rctpackage"].value = data["rctpackage"];
    qcsheet.elements["itemserial"].value = data["itemserial"];
    qcsheet.elements["makemodel"].value = data["makemodel"];
    qcsheet.elements["operatingsystem"].value = data["operatingsystem"];
    qcsheet.elements["msoinstalled"].value = data["msoinstalled"];
    qcsheet.elements["processortype"].value = data["processortype"];
    qcsheet.elements["processorgen"].value = data["processorgen"];
    qcsheet.elements["drivetype"].value = data["drivetype"];
    qcsheet.elements["ramtype"].value = data["ramtype"];
    qcsheet.elements["ramsize"].value = data["ramsize"];
    
    // Now we need to do some work to format our buttons
    let q1checks = JSON.parse(data["qc1"]);
    let q2checks = JSON.parse(data["qc2"]);
    console.log(q1checks);
    let qcheck = 0;

    for (let key in q1checks) {
        console.log(key);
        qcheck += 1;

        let qname = "q" + JSON.stringify(qcheck) + "_qc1";
        let buttons = document.getElementsByName(qname);

        if (q1checks[key] == "PASS") {
            buttons[0].click();
            buttons[0].checked = true;
        }
        if (q1checks[key] == "FAIL") {
            buttons[1].click();
            buttons[1].checked = true;
        }
        if (q1checks[key] == "N/A") {
            buttons[2].click();
            buttons[2].checked = true;
        }
        
    }
    qcheck = 0;

    for (let key in q2checks) {
        qcheck += 1;

        let qname = "q" + JSON.stringify(qcheck) + "_qc2";
        let buttons = document.getElementsByName(qname);

        if (q2checks[key] == "PASS") {
            buttons[0].click();
            buttons[0].checked = true;
        }
        if (q2checks[key] == "FAIL") {
            buttons[1].click();
            buttons[1].checked = true;
        }
        if (q2checks[key] == "N/A") {
            buttons[2].click();
            buttons[2].checked = true;
        }
    }
}

