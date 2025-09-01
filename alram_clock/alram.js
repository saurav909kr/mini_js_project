let timerRef = document.querySelector(".time-display");
const hourInput = document.getElementById("hourInput");
const minuteInput = document.getElementById("minuteInput");
const activeAlarms = document.querySelector(".activeAlarms");
const setAlarms = document.getElementById("set");

let alarmArray = [];
let alarmSound = new Audio("alram_ringtone.mp3");

let initialHour = 0,
    initialMinute = 0,
    alarmIndex = 0;

const appendZero = (value) => (value < 10 ? "0" + value : value);

function displayTimer() {
    let date = new Date();
    let [hours, minutes, seconds] = [appendZero(date.getHours()), appendZero(date.getMinutes()), appendZero(date.getSeconds())];
    timerRef.innerHTML = `${hours}:${minutes}:${seconds}`;

    alarmArray.forEach((alarm, index) => {
        if (alarm.isActive) {
            if (`${alarm.alarmHour}:${alarm.alarmMinute}` === `${hours}:${minutes}` && !alarm.hasRung) {
                alarmSound.play()
                alarmSound.loop = true;
            }
        };
    });
}

const inputCheck = (inputValue) => {
    inputValue = parseInt(inputValue);
    if (inputValue < 10) {
        inputValue = appendZero(inputValue);
    }
    return inputValue;
}

hourInput.addEventListener("input", () => {
    hourInput.value = inputCheck(hourInput.value);
});

minuteInput.addEventListener("input", () => {
    minuteInput.value = inputCheck(minuteInput.value);
});

const createAlarm = (alarmObj) => {
    const { id, alarmHour, alarmMinute } = alarmObj;
    let alarmDiv = document.createElement("div");
    alarmDiv.classList.add("alarm");
    alarmDiv.setAttribute("data-id", id)
    alarmDiv.innerHTML = `<span>${alarmHour}:${alarmMinute}</span>`;

    let checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.addEventListener("click", (e) => {
        if (e.target.checked) {
            startAlarm(e)
        } else {
            stopAlarm(e);
        }
    });

    alarmDiv.appendChild(checkBox);

    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`
    deleteButton.classList.add("deleteButton");
    deleteButton.addEventListener("click", (e) => deleteAlarm(e));
    alarmDiv.appendChild(deleteButton);
    activeAlarms.appendChild(alarmDiv)
}

setAlarms.addEventListener("click", () => {
    alarmIndex += 1;
    let alarmObj = {};
    alarmObj.id = `${alarmIndex}_${hourInput.value}_${minuteInput.value}`;
    alarmObj.alarmHour = hourInput.value;
    alarmObj.alarmMinute = minuteInput.value;
    alarmObj.isActive = false;
    alarmArray.push(alarmObj);
    createAlarm(alarmObj);
    hourInput.value = appendZero(initialHour);
    minuteInput.value = appendZero(initialMinute);

})

const searchObject = (parameter, value) => {
    let alarmObject, objIndex, exists = false;
    alarmArray.forEach((alarm, index) => {
        if (alarm[parameter] == value) {
            exists = true
            alarmObject = alarm;
            objIndex = index;
            return false;
        }
    });
    return [exists, alarmObject, objIndex];
};

const startAlarm = (e) => {
    let searchId = e.target.parentElement.getAttribute("data-id");
    let [exists, obj, index] = searchObject("id", searchId);
    if (exists) {
        alarmArray[index].isActive = true;
    }
};

const stopAlarm = (e) => {
    let searchId = e.target.parentElement.getAttribute("data-id");
    let [exists, obj, index] = searchObject("id", searchId);
    if (exists) {
        alarmArray[index].isActive = false;
        alarmSound.pause();
    }
};


deleteAlarm = (e) => {
    let searchId = e.target.parentElement.parentElement.getAttribute("data-id");
    let [exists, obj, index] = searchObject("id", searchId);
    if (exists) {
        e.target.parentElement.parentElement.remove()
        alarmArray.splice(index, 1);
    }
}



window.onload = () => {
    setInterval(displayTimer, 1000);
    initialHour = 0;
    initialMinute = 0;
    alarmIndex = 0;
    alarmArray = [];
    hourInput.value = appendZero(initialHour);
    minuteInput.value = appendZero(initialMinute);

};



