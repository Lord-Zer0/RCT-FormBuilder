// Import template from buttons.htm
const qcblock = document.querySelector('#qc-template');
const qcchecks = [
    { question: 'Case - Scratches/Dents/Cracks' },
    { question: 'Cleanliness - Inside/Outside, Stickers Removed'},
    { question: 'RAM/DRIVE - Correct specs/Size in OS'},
    { question: 'POST Errors/RAM seated properly'},
    { question: 'CMOS battery and clock'},
    { question: 'BIOS - Settings reset to factory defaults'},
    { question: 'BIOS - ID tags removed'},
    { question: 'Boot Sequence: HDD/CD/Network'},
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
    { question: 'Visual (cleanliness, screws, disks removed'},
    { question: 'Keyboard/Mouse - Clean/Working'},
    { question: 'Correct connectors/adapters - Clean/Working'},
    { question: 'Items match Sales Order - Verified'}
];

qcchecks.forEach(check => {
    // Create an instance of the template content
    const instance = document.importNode(qcblock.content, true);

    instance.querySelector('.question').innerHTML = check.question;

    // Append the instance at the DOM
    document.getElementById('qcchecks').appendChild(instance);
});
