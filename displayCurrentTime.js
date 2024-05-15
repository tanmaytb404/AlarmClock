/* Function to display current time */
export function displayTime() {
    let currentTime = new Date();
    let hours = currentTime.getHours();
    let mins = currentTime.getMinutes();
    let sec = currentTime.getSeconds();
    let date = currentTime.getDate();
    let weekday = currentTime.toLocaleString('en-us', { weekday: 'long' });
    let monthName = currentTime.toLocaleString('en-us', { month: 'long' })
    const currentTimeEl = document.getElementById("time");
    const dateEl = document.getElementById("date");
    let am_pm = "AM";
    if (hours > 12) {
        hours = hours - 12;
        am_pm = "PM";
    }
    hours = hours < 10 ? `0${hours}` : `${hours}`;
    if (hours == '00')
        hours = '12';
    mins = mins < 10 ? `0${mins}` : `${mins}`;
    sec = sec < 10 ? `0${sec}` : `${sec}`;
    let display = `<span>${hours} : ${mins} : ${sec}</span><span class="toggleDayNight">${am_pm}</span>`;
    currentTimeEl.innerHTML = display;
    let displayDate = `<span>${weekday}, ${monthName} ${date}`;
    dateEl.innerHTML = displayDate;
}