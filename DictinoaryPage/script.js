const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const result = document.getElementById("result");
const searchbtn = document.getElementById("search-btn");
const soundbtn =  document.getElementsByClassName("sound-btn");

searchbtn.addEventListener(("click"),() => {
    let input_word = document.getElementById("inp_word").value;
    fetch(`${url}${input_word}`)
         .then((Response) => {
            return Response.json();
            
         })
         .then((data) => {
            console.log(data);
            result.innerHTML = ` <div class="word">
                <h3>${input_word}</h3>
                <button class="sound-btn"><i class="fa-solid fa-volume-high"></i></button>
            </div>
            <div class="detail">
                <p>${data[0].meanings[0].partOfSpeech}</p>
                <p>${data[0].phonetic}</p>
            </div>
            <p class=".word_means">
             ${data[0].meanings[0].definitions[0].definition}
             </p>
            <p class="example">
            ${data[0].meanings[0].definitions[0].example}
            </p>`;
        
         })
})