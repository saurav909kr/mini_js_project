let videoContainer = document.querySelector(".video-container");
let container = document.querySelector(".container");
let myVideo = document.getElementById("my_video");
let rotateContainer = document.querySelector(".rotate-container");
let videoControl = document.querySelector(".control");
let playButton = document.getElementById("play-btn");
let paushButton = document.getElementById("pause-btn");
let volume = document.getElementById("volume");
let volumeRange = document.getElementById("volume-range");
let volumeNum = document.getElementById("volume-num");
let high = document.getElementById("high");
let low = document.getElementById("low");
let mute = document.getElementById("mute");
let sizeScreen = document.getElementById("size-screen");
let screenCompress = document.getElementById("screen-compress");
let screenExpand = document.getElementById("screen-expand");
let currentProgress = document.getElementById("current-progress");
let currentDot = document.getElementById("current-dot");
let currentTimeRef = document.getElementById("current-time");
const maxDuration = document.getElementById("max-duration");
const progressBar = document.getElementById("progress-bar");
const playSpeedButton = document.getElementById("playback-speed-btn");
const playbackContainer = document.querySelector(".playback");
const playbackSpeedOption = document.querySelector(".playback-options");

function slider() {
    valPersent = (volumeRange.value / volumeRange.max) * 100;
    volumeRange.style.background = `linear-gradient(to right, #2887e3 ${valPersent}%, #ffff ${valPersent}%)`
}

let events = {
    mouse: {
        click: "click"
    },
    touch: {
        click: "touchstart"
    },
};

let deviceType = "";

const isTouchdevice = () => {
    try {
        document.createEvent("TouchEvent")
        deviceType = "touch";
        return true;
    } catch (e) {
        deviceType = "mouse";
        return false;
    };
};

playButton.addEventListener("click", () => {
    myVideo.play();
    paushButton.classList.remove("hide");
    playButton.classList.add("hide");
});

paushButton.addEventListener("click", paushVideo = () => {
    myVideo.pause();
    paushButton.classList.add("hide");
    playButton.classList.remove("hide");
});

playbackContainer.addEventListener("click", () => {
    playbackSpeedOption.classList.remove("hide");
});

window.addEventListener("click", (e) => {
    if (!playbackContainer.contains(e.target)) {
        playbackSpeedOption.classList.add("hide");
    } else if (playbackSpeedOption.contains(e.target)) {
        playbackSpeedOption.classList.add("hide");
    }
})

const setPlayback = (value) => {
    playSpeedButton.innerText = value + "x";
    myVideo.playbackRate = value;
}

const muter = () => {
    mute.classList.remove("hide");
    high.classList.add("hide");
    low.classList.add("hide");
    myVideo.volume = 0;
    volumeNum.innerHTML = 0;
    volumeRange.value = 0;
    volumeRange.style.background = `linear-gradient(to right, #ffff 100%)`

}

high.addEventListener("click", muter);
low.addEventListener("click", muter);

volumeRange.addEventListener("input", () => {
    let volumeValue = volumeRange.value / 100;
    myVideo.volume = volumeValue;
    volumeNum.innerHTML = volumeRange.value;

    if (volumeRange.value < 50) {
        low.classList.remove("hide")
        high.classList.add("hide");
        mute.classList.add("hide");
    } else if (volumeRange.value > 50) {
        low.classList.add("hide");
        mute.classList.add("hide");
        high.classList.remove("hide");

    }
});

screenExpand.addEventListener("click", () => {
    screenCompress.classList.remove("hide");
    screenExpand.classList.add("hide");
    videoContainer
        .requestFullscreen()
        .catch((err) => alert("Your device doesn't support full screen API"));
    if (isTouchdevice) {
        let screenOrientation = screen.orientation || screen.mozOrientation || screen.msOrientation;
        if (screenOrientation.type == "portrait-primary") {
            paushVideo();
            rotateContainer.classList.remove("hide");
            const myTime = setTimeout(() => {
                rotateContainer.classList.add("hide");
            }, 3000);
        }
    }
});

document.addEventListener("fullscreenchange", exitHandler);
document.addEventListener("webkitfullscreenchange", exitHandler);
document.addEventListener("mozfullscreenchange", exitHandler);
document.addEventListener("MSFullscreenchange", exitHandler);

function exitHandler() {
    if (
        !document.fullscreenElement &&
        !document.webkitIsFullScreen &&
        !document.mozfullScreen &&
        !document.msFullscreenElement
    ) {
        normalScreen();
    }
}

screenCompress.addEventListener("click", (normalScreen = () => {
    screenCompress.classList.add("hide");
    screenExpand.classList.remove("hide");
    if (document.fullscreenElement) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullScreen) {
            document.webkitExitFullScreen();
        }
    }
})
);

const timeFormatter = (timeInput) => {
    let minute = Math.floor(timeInput / 60);
    minute = minute < 10 ? "0" + minute : minute;
    let second = Math.floor(timeInput % 60);
    second = second < 10 ? "0" + second : second;
    return `${minute}:${second}`;
};

setInterval(() => {
    currentTimeRef.innerHTML = timeFormatter(myVideo.currentTime);
    currentProgress.style.width = (myVideo.currentTime / myVideo.duration) * 100 + "%";
    currentDot.style.left =  ((myVideo.currentTime / myVideo.duration) * 100)  + "%";
}, 1000);

myVideo.addEventListener("timeupdate", () => {
    currentTimeRef.innerText = timeFormatter(myVideo.currentTime);
});

isTouchdevice();
progressBar.addEventListener(events[deviceType].click, (event) => {
    let coordStart = progressBar.getBoundingClientRect().left;

    let coordEnd = !isTouchdevice() ? event.clientX : event.touches[0].clientX;
    let progress = (coordEnd - coordStart) / progressBar.offsetWidth;
    currentProgress.style.width = progress * 100 + "%";
    myVideo.currentTime = progress * myVideo.duration;
    myVideo.play();
    paushButton.classList.remove("hide");
    playButton.classList.add("hide");
})


myVideo.onloadedmetadata = () => {
    maxDuration.innerText = timeFormatter(myVideo.duration);
};

window.onload = () => {
slider()
}
