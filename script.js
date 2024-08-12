const multiStepForm = document.querySelector('[data-multi-step]');
const formSteps = [...multiStepForm.querySelectorAll('[data-step]')];
const steps = document.querySelectorAll('.step-number');
const stepsDiv = document.querySelector('.step');

let currentStep = formSteps.findIndex(step => step.classList.contains('active'));
let formData = {}; // To store all form data
let selectedOptions = []; // To store selected options

// Set the initial step text
stepsDiv.querySelector('p').innerHTML = `Step ${currentStep + 1} of 3`;

if (currentStep < 0) {
    currentStep = 0;
    formSteps[currentStep].classList.add('active');
    showStepForm();
}

// Handle selection of options
let selectBox = document.querySelectorAll('.select-box');
selectBox.forEach(div => {
    div.addEventListener('click', () => {
        div.classList.toggle('active');
        const index = selectedOptions.indexOf(div.textContent.trim());

        if (index === -1) {
            selectedOptions.push(div.textContent.trim());
        } else {
            selectedOptions.splice(index, 1);
        }
        console.log(selectedOptions);
    });
});

// Multi-step form navigation
multiStepForm.addEventListener('click', e => {
    e.preventDefault();

    let incrementor = null;
    if (e.target.matches('[data-next]')) {
        incrementor = 1;
    } else if (e.target.matches('[data-previous]')) {
        incrementor = -1;
    }

    if (incrementor == null) return;

    const inputs = [...formSteps[currentStep].querySelectorAll('input')];
    const allValid = inputs.every(input => input.reportValidity());

    // Collect all input values
    inputs.forEach(input => {
        formData[input.name] = input.value;
    });
    console.log(formData);

    if (allValid) {
        currentStep += incrementor;
        showStepForm();
        updateFormSteps();
    }

    // If it's the last step, show the summary
    if (currentStep === formSteps.length - 1) {
        showSummary();
    }
});

// Function to show the current step form
function showStepForm() {
    formSteps.forEach((step, index) => step.classList.toggle('active', index === currentStep));
}

// Function to display the summary
function showSummary() {
    const summaryDiv = document.querySelector('.card:nth-of-type(3) .form-group');
   
    // Display form data
    for (const key in formData) {
        let data = document.createElement('p');
        let titleOfData = document.createElement('span');
        titleOfData.textContent = `${key}:`;
        data.appendChild(titleOfData);
        data.innerHTML += formData[key];
        summaryDiv.appendChild(data);
    }

    // Display selected options
    let titleOfData = document.createElement('span');
    titleOfData.textContent = `topics:`;
    summaryDiv.appendChild(titleOfData);

    let list = document.createElement('ul');
    summaryDiv.appendChild(list);

    selectedOptions.forEach(option => {
        let item = document.createElement('li');
        item.textContent = option;
        list.appendChild(item);
    });
}

// Function to update step indicators
function updateFormSteps() {
    stepsDiv.querySelector('p').innerHTML = `Step ${currentStep + 1} of 3`;
    steps[currentStep].classList.add('active');
}

// Handle summary button click
const summaryBtn = document.querySelector('.card:nth-of-type(3) button');
summaryBtn.addEventListener('click', () => {
    alert('Success -_-');
});
