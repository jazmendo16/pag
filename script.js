let startTime;
let elapsedTime = 0;
let timerInterval;
let lapTimes = [];

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const captureBtn = document.getElementById('captureBtn');
const resetBtn = document.getElementById('resetBtn');
const resultsBody = document.getElementById('resultsBody');

function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);

    return `${hh.toString().padStart(2, "0")}:${mm.toString().padStart(2, "0")}:${ss.toString().padStart(2, "0")}.${ms.toString().padStart(2, "0")}`;
}

function print(txt) {
    display.innerHTML = txt;
}

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        print(timeToString(elapsedTime));
    }, 10);
    showButton("STOP");
}

function stop() {
    clearInterval(timerInterval);
    showButton("START");
}

function reset() {
    clearInterval(timerInterval);
    print("00:00:00.00");
    elapsedTime = 0;
    lapTimes = [];
    resultsBody.innerHTML = "";
    showButton("START");
    captureBtn.disabled = true;
}

function capture() {
    const currentTime = elapsedTime;
    lapTimes.push(currentTime);
    
    const firstTime = lapTimes[0];
    const diff = currentTime - firstTime;
    
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${lapTimes.length}</td>
        <td>${timeToString(currentTime)}</td>
        <td>${lapTimes.length === 1 ? '---' : '+' + timeToString(diff)}</td>
    `;
    resultsBody.appendChild(row);
}

function showButton(buttonKey) {
    if (buttonKey === "STOP") {
        startBtn.innerHTML = "Pausar";
        startBtn.style.background = "#ffc107";
        captureBtn.disabled = false;
    } else {
        startBtn.innerHTML = "Iniciar";
        startBtn.style.background = "#28a745";
    }
}

// Event Listeners
startBtn.addEventListener("click", () => {
    if (startBtn.innerHTML === "Iniciar") start();
    else stop();
});

captureBtn.addEventListener("click", capture);
resetBtn.addEventListener("click", reset);