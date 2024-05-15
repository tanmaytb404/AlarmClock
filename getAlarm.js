import { alarmList } from "./setAlarm.js";

/* Function to display the alarms in the alarm list */
function show() {
    const alarmListEl = document.getElementById("alarmList");
    alarmListEl.innerHTML = '';

    // Sort the alarmList array based on the time values
    alarmList.sort((a, b) => {
        // Extract time values from list items
        const timeA = extractTime(a);
        const timeB = extractTime(b);

        // Compare time values for sorting
        if (timeA < timeB) {
            return -1;
        } else if (timeA > timeB) {
            return 1;
        } else {
            return 0;
        }
    });

    // Insert sorted list items into the alarmListEl
    alarmList.forEach(ele => {
        alarmListEl.insertAdjacentHTML("beforeend", ele);
        const spanEl = document.getElementById('default');
        spanEl.style.display = 'none';
    });
    //calling delete functionality
    deleteBtn();
}

// Function to extract time value from list item
function extractTime(item) {
    const match = item.match(/(\d{1,2}:\d{2})(AM|PM)/);
    if (match) {
        const time = match[1];
        const period = match[2];
        // Convert time to 24-hour format if necessary
        let [hours, minutes] = time.split(':').map(Number);
        if (period === 'PM') {
            return `${hours + 12}:${minutes}`;
        } else {
            if (hours == '12')
                hours = '0';
            return `${hours}:${minutes}`;
        }
    } else {
        return '';
    }
}

/* Function to add delete functionality on each buttons */
function deleteBtn() {
    const deleteButtons = document.querySelectorAll('.alarm-activity.del button');
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const listItem = button.closest('li');
            const regex = /data-value="(\d+)"/; //collecting data-value of the delete button
            const match = listItem.innerHTML.match(regex);
            delFromAlarmList(match[1]); //using the unique data value deleting the alarm from array of alarms
        });
    });
}

/* function will be called only when the event is trigerred on delete button */
function delFromAlarmList(uid) {
    let index = 0;
    for (let ele in alarmList) {
        const regex = /data-value="(\d+)"/;
        const match = alarmList[ele].match(regex);
        if (uid === match[1]) {
            index = ele;
            break;
        }
    }
    alarmList.splice(index, 1);
    const toast = document.getElementById('liveToast')
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast)
    const toastbody = document.getElementById('toast-body');
    toastbody.textContent = `Hello, Your alarm is deleted`;
    toastBootstrap.show();
    if (alarmList.length == 0) {
        const spanEl = document.getElementById('default');
        spanEl.style.display = 'flex';
    }
    //once deleted calling show and scheduleAlarms againg to sync the alarms properly
    show();
    scheduleAlarms();
}

/* creating array to store the timeouts so that it can be deleted when required. */
let scheduledAlarms = [];
function scheduleAlarms() {
    // Clear previously scheduled alarms
    clearTimeouts();
    alarmList.forEach(ele => {
        let time = extractTime(ele); //extrating the time in the proper format cause ele contains the whole html li item
        let [hours, minutes] = time.split(':').map(Number);
        let now = new Date();
        let alarmTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
        let timeDifference = alarmTime - now; //calculating the time difference of current time and scheduled time 
        if (timeDifference > 0) {
            const alarmTimeout = setTimeout(() => {
                alert(`Wake up!!!!!!!!!!!`);
                const regex = /data-value="(\d+)"/;
                const match = ele.match(regex);
                delFromAlarmList(match[1]);
                show();
            }, timeDifference); //timeout is based on the difference calculated.
            scheduledAlarms.push(alarmTimeout);//store the timeouts to cclear later
        }
    });
}

function clearTimeouts() {
    // Clear all previously scheduled alarms
    scheduledAlarms.forEach(timeout => {
        clearTimeout(timeout);
    });
    // Clear the array
    scheduledAlarms = [];
}

//bootstrap tooltip to the alarm logo
document.addEventListener("DOMContentLoaded", (function () { [].slice.call(document.querySelectorAll("[data-bss-tooltip]")).map((function (t) { return new bootstrap.Tooltip(t) })) }), !1);
export { show, scheduleAlarms };