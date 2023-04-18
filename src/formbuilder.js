// Import template from buttons.htm
const qcblock = document.getElementById('#qc-template');
const qcchecks = [
    { question: 'Case - Scratches/Dents/Cracks' }
];

qcchecks.forEach(check => {
    // Create an instance of the template content
    const instance = document.importNode(qcblock.innerHTML);

    instance.querySelector('.question').innerHTML = check.question;
});