const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdown-form");
const dateEl = document.getElementById("date-picker");

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeInfo = document.getElementById('complete-info');
const completeButton = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;
let savedCountdown;

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

// Set Date Input Min with Today's date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

// Populate CountDown / Complete UI
function updateDOM() {
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const difference = countdownValue - now;

        const days = Math.floor(difference / DAY);
        const hours = Math.floor((difference % DAY) / HOUR);
        const minutes = Math.floor((difference % HOUR) / MINUTE);
        const seconds = Math.floor((difference % MINUTE) / SECOND);

        // Hide input 
        inputContainer.hidden = true;

        // If the countdown has ended, show complete
        if (difference < 0) {
            countdownEl.hidden = true;
            clearInterval(countdownActive);
            completeInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
            completeEl.hidden = false;
            return;
        }

        // Populate countdown
        countdownElTitle.textContent = `${countdownTitle}`;
        timeElements[0].textContent = `${days}`;
        timeElements[1].textContent = `${hours}`;
        timeElements[2].textContent = `${minutes}`;
        timeElements[3].textContent = `${seconds}`;

        completeEl.hidden = true;
        countdownEl.hidden = false;
    }, SECOND);
}

// Take Values from Form Input
function updateCountdown(e) {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;

    savedCountdown = {
        countdownTitle,
        countdownDate
    };

    localStorage.setItem("countdown", JSON.stringify(savedCountdown));

    if (countdownDate === '') {
        alert('Please select a date!');
        return;
    }

    // Get number version of current Date and update DOM
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
}

// Reset All Values
function reset() {
    // Hide countdown, show input
    completeEl.hidden = true;
    countdownEl.hidden = true;
    inputContainer.hidden = false;

    //Stop countdown
    clearInterval(countdownActive);

    //Reset values
    countdownTitle = '';
    countdownDate = '';

    localStorage.removeItem("countdown");
}

function restorePreviousCountdown() {
    const recovered = localStorage.getItem('countdown');
    // Get countdown from localStorage
    if (recovered) {
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(recovered);
        countdownTitle = savedCountdown.countdownTitle;
        countdownDate = savedCountdown.countdownDate;

        // Get number version of current Date and update DOM
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

restorePreviousCountdown();

// Event Listeners
countdownForm.addEventListener("submit", updateCountdown);
countdownBtn.addEventListener('click', reset);
completeButton.addEventListener('click', reset);