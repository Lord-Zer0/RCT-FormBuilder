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

const reader = new FileReader();

// Event listeners
const qcform = document.querySelector("#laptop-qc-form");
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

    // qcchecks.forEach(check => {
    //     if (check.isHeader != true) {
    //         instance.getElementById('.')
    //         formJSON.append(check.question, )
    //     }
    // });

    console.log(JSON.stringify(formJSON, null, 2));


    // [Depreceated] formdata is a string method to autofill form from saved entries, replaced by json file load
    // const formData = [...data.entries()];

    // const asString = formData
    //     .map(x => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
    //     .join('&');

    // console.log(asString);

    saveFile(formJSON);
}

function mapQCdata(qcno) {
    let qmap = new Map();
    qcchecks.forEach(check => {
        let qcheck = 0;

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

        // const asString = data
        //     .map(x => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
        //     .join('&');
        // console.log(asString);
        // const url = window.location.pathname + '?' + asString;
        // window.location.href = url;

        formAutofill(data);
    }
}


function formAutofill(data) {
    const qcsheet = document.querySelector("#laptop-qc-form");
    const qcJSON = Object.fromEntries(new FormData(qcsheet).entries());
    console.log(qcJSON);

    // Version 1.0 with jquery elements
    // $("form#laptop-qc-form :input[type=text]").each(function(index) {
    //     let input = $(this);
    //     if (data[index])
    // });

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
    let q2checks = JSON.parse(data["qc1"]);
    console.log(q1checks);
    let qcheck = 0;

    for (let key in q1checks) {
        console.log(key);
        qcheck += 1;

        let qname = "q" + JSON.stringify(qcheck) + "_qc1";
        let buttons = document.getElementsByName(qname);

        if (q1checks[key] == "PASS") {
            buttons[0].click();
        }
        if (q1checks[key] == "FAIL") {
            buttons[1].click();
        }
        if (q1checks[key] == "NA") {
            buttons[2].click();
        }
        
    }
    qcheck = 0;

    for (let key in q2checks) {
        qcheck += 1;

        let qname = "q" + JSON.stringify(qcheck) + "_qc2";
        let buttons = document.getElementsByName(qname);

        if (q2checks[key] == "PASS") {
            buttons[0].click();
        }
        if (q2checks[key] == "FAIL") {
            buttons[1].click();
        }
        if (q2checks[key] == "NA") {
            buttons[2].click();
        }
    }

    // get questiontextname_qc1
    // if PASS, set qc1-pass to ACTIVE
    // same for FAIL, qc1-fail
    // N/A, qc1-na


}