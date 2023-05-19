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

        // qname = check.question.split(/[^a-z]i/)[0];
        // console.log(qname)
        qname = check.question;

        instance.querySelector('.qc1-toggle').setAttribute("name", qname + "_qc1");
        instance.querySelector('.qc2-toggle').setAttribute("name", qname + "_qc2");
        // const qc1 = instance.querySelector('.qc1-toggle');


        // Append the instance at the DOM
        document.getElementById('qcchecks').appendChild(instance);
    }
});

function handleFormSubmit(event) {
    event.preventDefault();

    const data = new FormData(event.target);

    const formJSON = Object.fromEntries(data.entries());

    var qmap = new Map();

    qcchecks.forEach(check => {
        if (check.question != undefined && check.question != null){
            //qname = check.question.split(/[^a-z]i/)[0] + "_qc1";
            // console.log(qname);
            // qmap.append(document.querySelector(qname).entries())
            let qname = check.question + "_qc1";
            let elements = document.getElementsByName(qname);
            qmap[check.question] = elements.entries();
            //console.log(JSON.stringify(qmap));
        }
    })

    formJSON.qc1 = JSON.stringify(qmap);

    // qcchecks.forEach(check => {
    //     if (check.isHeader != true) {
    //         instance.getElementById('.')
    //         formJSON.append(check.question, )
    //     }
    // });

    console.log(JSON.stringify(formJSON, null, 2));

    const formData = [...data.entries()];

    const asString = formData
        .map(x => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
        .join('&');

    console.log(asString);
};

const form = document.querySelector("#laptop-qc-form");
form.addEventListener("submit", handleFormSubmit);