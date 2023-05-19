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

qno = 0;

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
        qname = check.question;

        // Use query check names to describe each group of buttons (legacy)
        instance.querySelector('.qc1-toggle').setAttribute("name", qname + "_qc1");
        instance.querySelector('.qc2-toggle').setAttribute("name", qname + "_qc2");

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

    const formJSON = Object.fromEntries(data.entries());

    var qmap = new Map();

    qcheck = 0

    qcchecks.forEach(check => {
        if (check.question != undefined && check.question != null){
            qcheck += 1
            qname = "q" + JSON.stringify(qcheck) + "_qc1";
            // console.log(qname);
            // let qname = check.question + "_qc1";
            // let elements = document.getElementsByName(qname);
            // console.log(elements);
            // console.log(elements[0]);
            // let buttons = elements[0].children.getElementsByName('qc1');
            // console.log(buttons);

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