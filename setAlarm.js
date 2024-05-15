import { displayTime } from "./displayCurrentTime.js";
import { show, scheduleAlarms } from "./getAlarm.js";
displayTime(); //Initial display
setInterval(displayTime, 1000); //display at 1s interval
const userInputHH = document.getElementById("hours");
const userInputMM = document.getElementById("minutes");
const toggleDaytime = document.getElementById("toggleDaytime");

/* Setting input fields(of Modal) with current times to set a alarm*/
const addAlarm = document.getElementById("addAlarm");
addAlarm.addEventListener("click", () => {
    let now = new Date();
    let hh = now.getHours();
    let mm = now.getMinutes();
    let period = `AM`;
    if (hh > 12) {
        hh = hh - 12;
        period = `PM`;
    }
    if (hh == '00')
        userInputHH.value = '12';
    else
        userInputHH.value = hh < 10 ? `0${hh}` : `${hh}`;
    userInputMM.value = mm < 10 ? `0${mm}` : `${mm}`;
    toggleDaytime.value = period;
});



/* Restricting user to input 2 digit value and from [0-12] for hours*/
let inputHH = "";
userInputHH.addEventListener("input", (e) => {
    if (e.target.value.length > 2) {
        alert("Wrong Input!");
        userInputHH.value = inputHH;
    }
    else if ((e.target.value < 0 || e.target.value > 12)) {
        alert("Wrong input! Enter Value from 1 to 12!");
        userInputHH.value = inputHH;
    }
    else {
        inputHH = e.target.value;
    }
});

/* Restricting user to input 2 digit value and from [0-59] for minutes*/
let inputMM = "";
userInputMM.addEventListener("input", (e) => {
    if (e.target.value.length > 2) {
        alert("Wrong input!");
        userInputMM.value = inputMM;
    }
    if (e.target.value < 0 || e.target.value > 59) {
        alert("Wrong input! Enter Value from 1 to 59!");
        userInputMM.value = inputMM;
    }
    else {
        inputMM = e.target.value;
    }
});

/* created this alarmList to store all the alarms created by the user */
export let alarmList = [];

let uid = 0; //to add unique data-value attribute so that later it can be fetched for relevent alarms

/* Taking the user inputs and storing them into the array for later use */
const saveData = document.getElementById("save");
saveData.addEventListener("click", () => {
    /* Validation */
    if (userInputHH.value === '' || userInputMM.value === '') {
        alert("Please fill hours and minutes properly..!");
    }
    else {
        /* create the html element using the userinputs and store into the array */
        let HH = userInputHH.value;
        let MM = userInputMM.value;
        let listEl = `
        <li>
            <div class="top-section">
                <div class="alarm-time">${HH}:${MM}${toggleDaytime.value}</div>
                <div class="alarm-activity del"><button type="button" class="btn btn-outline-danger" data-value="${uid++}">Delete</button></div>
            </div>
        </li>`;

        /* Restricting to 11 alarms only */
        if (alarmList.length <= 10) {
            alarmList.push(listEl);
            show(); //calling the show method to display the alarms.
            scheduleAlarms(); //scheduling alarms when time goes of.
            const close = document.getElementById("close");
            close.click();

            /* Showing the toast Notification */
            const toast = document.getElementById('liveToast')
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast)
            const toastbody = document.getElementById('toast-body');
            toastbody.textContent = `Hello, Your alarm is set @${userInputHH.value}:${userInputMM.value} ${toggleDaytime.value}`;
            toastBootstrap.show();
        }
        else {
            alert('Please delete the unnecessary alarms first!')
        }
    }
});

