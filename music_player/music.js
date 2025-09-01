const playListButon = document.getElementById("playlist");
const songImg = document.getElementById("song-image");
const songName = document.getElementById("song_name");
const songArtist = document.getElementById("song_artist");
const pauseButton = document.getElementById("pause");
const playButton = document.getElementById("play");
const prevButton = document.getElementById("prev");
const suffleButton = document.getElementById("suffle");
const currentProgressBar = document.getElementById("current_progressBar");
const progressbar = document.getElementById("progressbar");
const audio = document.getElementById("audio");
const repeatButton = document.getElementById("repeat");
const nextButton = document.getElementById("next");
const playlistSong = document.getElementById("playlist_song");
const playlistSong_1 = document.getElementById("playlist_song_1");
const playlistContainer = document.getElementById("playlist_conatiner");
const playlistContainer_1 = document.getElementById("playlist_container_1");
const closeButton = document.getElementById("close_button");
const closeButton1 = document.getElementById("close_button_1");
const maxDuration = document.getElementById("max-duration");
const currentTimeRef = document.getElementById("current_time");

// index for song 
let index;

let loop = true;

const songsList_1 = [
    {
        name: "Behti Hawa Sa Tha Woh",
        link: "music/Behti Hawa Sa Tha Woh-(SambalpuriStar.In).mp3",
        Image: "images/behtiHawa.jpeg",
        artist: "Shaan & Shantanu"

    },

    {
        name: "Channa Mereya",
        link: "music/Channa Mereya-(SambalpuriStar.In).mp3",
        Image: "images/chanaMeraYA.jpg",
        artist: "Pritam Arjit"

    }
    ,

    {
        name: "Dil Cheej Thujhe Dedi",
        link: "music/Dil Cheez Tujhe Dedi-(SambalpuriStar.In).mp3",
        Image: "images/dilCheej.jpeg",
        artist: "Ankit Tiwari & Arjit Singh"

    }
    ,

    {
        name: "Duniya",
        link: "music/Duniyaa-(SambalpuriStar.In).mp3",
        Image: "images/duniya.jpeg",
        artist: "Abhijeet V Kunal V"

    }
    ,

    {
        name: "Jug Jug Jeeva",
        link: "music/Jug Jug Jeeve-(SambalpuriStar.In).mp3",
        Image: "images/jugjug.jpeg",
        artist: "Sachin Jigar"

    }
    ,

    {
        name: "Sahiba",
        link: "music/Sahiba-(SambalpuriStar.In).mp3",
        Image: "images/sahiba.jpeg",
        artist: "Ankit Chhetri"

    }

]

const songsList = [
    {
        name: "Dum Dum",
        link: "music/Dum_Dum_1.mp3",
        Image: "images/dumdum.jpg",
        artist: "Jaani & Asees Kaur"
    },

    {
        name: "Azul",
        link: "music/AZUL_1.mp3",
        Image: "images/azul.image.jpg",
        artist: "Guru Randhawa"
    },

    {
        name: "Pardesiya",
        link: "music/Pardesia.mp3",
        Image: "images/pardsiya.jpeg",
        artist: "Sachin Jigar Sonu Nigam"
    },

    {
        name: "Tanu Yaad Karaan",
        link: "music/Tum Tak(KoshalWorld.Com).mp3",
        Image: "images/Tenu-Yaad-Karaan.jpg",
        artist: "Gurnazar Chattha"
    },

    {
        name: "Tum Tak",
        link: "music/Tum Tak(KoshalWorld.Com).mp3",
        Image: "images/tumtak.jpg",
        artist: "A.R Rahman"
    }
]

let events = {
    mouse: {
        click: "click"
    },
    touch: {
        click: "touchstart"
    },
};

let deviceType = "";

const isTouchDevice = () => {
    try {
        document.createEvent("TouchEvent");
        deviceType = "touch";
        return true;
    } catch (e) {
        deviceType = "mouse";
        return false;
    }
};

const timeFormatter = (timeInput) => {
    let minute = Math.floor(timeInput / 60);
    minute = minute < 10 ? "0" + minute : minute;
    let second = Math.floor(timeInput % 60);
    second = second < 10 ? "0" + second : second;
    return `${minute}:${second}`
};

const setSong = (arrayIndex, list = songsList) => {
    let { name, link, artist, Image } = list[arrayIndex]
    audio.src = link;
    songName.innerHTML = name;
    songArtist.innerHTML = artist;
    songImg.src = Image;
    audio.onloadedmetadata = () => {
        maxDuration.innerText = timeFormatter(audio.duration);
    };
};

const playAudio = () => {
    audio.play();
    pauseButton.classList.remove("hide");
    playButton.classList.add("hide");
};

repeatButton.addEventListener("click", () => {
    if (repeatButton.classList.contains("active")) {
        repeatButton.classList.remove("active");
        audio.loop = false;
        console.log("repeat off");
    } else {
        repeatButton.classList.add("active");
        audio.loop = true;
        console.log("repeat off");
    };
});



const nextSong = () => {
    if (loop) {
        if (index == songsList.length - 1) {
            index = 0;
        } else {
            index += 1
        }
        setSong(index)
        playAudio();
    } else {
        let randIndex = Math.floor(Math.random() * songArtist.length);
        setSong(randIndex);
        playAudio()
    };
};

const pauseAudio = () => {
    audio.pause();
    pauseButton.classList.add("hide");
    playButton.classList.remove("hide");
}

const prevSong = () => {
    if (index > 0) {
        pauseAudio();
        index -= 1;
    } else {
        index = songsList.length - 1;
    }
    setSong(index);
    playAudio()
};

audio.onended = () => {
    nextSong()
};

suffleButton.addEventListener("click", () => {
    if (suffleButton.classList.contains("active")) {
        suffleButton.classList.remove("active");
        loop = true;
    } else {
        suffleButton.classList.add("active")
        loop = false;
    };
})

isTouchDevice();
progressbar.addEventListener(events[deviceType].click, (event) => {
    let coordStart = progressbar.getBoundingClientRect().left;
    let coordEnd = !isTouchDevice() ? event.clientX : event.touches[0].clientX;

    let progress = (coordEnd - coordStart) / progressbar.offsetWidth;
    currentProgressBar.style.width = progress * 100 + "%";

    audio.currentTime = progress * audio.duration;
    audio.play();

    pauseButton.classList.remove("hide");
    playButton.classList.add("hide");
});

setInterval(() => {
    currentTimeRef.innerHTML = timeFormatter(audio.currentTime);
    currentProgressBar.style.width = (audio.currentTime / audio.duration.toFixed(3)) * 100 + "%"

}, 1000);


playButton.addEventListener("click", playAudio);
nextButton.addEventListener("click", nextSong);
pauseButton.addEventListener("click", pauseAudio);
prevButton.addEventListener("click", prevSong);



audio.addEventListener("timeupdate", () => {
    currentTimeRef.innerHTML = timeFormatter(audio.currentTime);
})


const initializerPlaylist = () => {
    for (let i in songsList) {
        // create <li>
        let li = document.createElement("li");
        li.className = "playlistSong";

        // insert content
        li.innerHTML = `
    <div class="playlist-img-cont">
      <img src="${songsList[i].Image}"/>
    </div>
    <div class="playlist-song-detail">
      <span class="playlist-song-name">${songsList[i].name}</span>
      <span class="playlist-song-artist">${songsList[i].artist}</span>
    </div>
  `;

        playlistSong.appendChild(li);

        if(i == 0) {
            li.addEventListener("click", () => {
                newplayList();
                playlistContainer.classList.add("hide");
                playlistContainer_1.classList.remove("hide");
                playlistContainer_1.style.zIndex = 2;
            });
        } else {
            li.addEventListener("click",()=>{
                setSong(i,songsList);
                playAudio();
                playlistContainer.classList.add("hide");
            })
        }



    }

}

// another playlist 

const newplayList = () => {
    playlistContainer_1.classList.remove("hide");
    playlistSong_1.innerHTML = "";
    songsList_1.forEach((songs, index) => {
        // create <li>
        let li = document.createElement("li");
        li.className = "playlistSong";

        // insert content
        li.innerHTML = `
    <div class="playlist-img-cont">
      <img src="${songs.Image}"/>
    </div>
    <div class="playlist-song-detail">
      <span class="playlist-song-name">${songs.name}</span>
      <span class="playlist-song-artist">${songs.artist}</span>
    </div>
  `;


        
        li.addEventListener("click", () => {
            setSong(index, songsList_1);
            playAudio();
            playlistContainer_1.classList.add('hide');
        });

        
        playlistSong_1.appendChild(li);
    })

};

closeButton.addEventListener("click", () => {
    playlistContainer.classList.add("hide");
})


playListButon.addEventListener("click", () => {
    playlistContainer.classList.remove("hide");
})

closeButton1.addEventListener("click", () => {
    playlistContainer_1.classList.add("hide");
})

window.addEventListener("click", function (e) {
    e.preventDefault();

});

window.onload = () => {
    index = 0;
    setSong(index);
    initializerPlaylist();
}
