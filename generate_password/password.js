let inputSlider = document.getElementById("inputSlider");
let sliderValue = document.getElementById("sliderValue");

let passBox = document.getElementById("passBox");
let upperCase = document.getElementById("upperCase");
let lowerCase = document.getElementById("lowerCase");
let number = document.getElementById("number");
let symbol = document.getElementById("symbol");
let genBtn = document.getElementById("genBtn");
let copyIcon = document.getElementById("copyIcon");


sliderValue.textContent = inputSlider.value;
inputSlider.addEventListener('input', ()=>{
    sliderValue.textContent = inputSlider.value;
});

genBtn.addEventListener('click', ()=>{
    passBox.value = generatePassword();
})


let lowerChars = "abcdefghijklmnopqrstuvwxyz";
let upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let allNumber = "1234567890";
let allSymbol = "~!@#$%^&*?";

function generatePassword(){
    let genPassword = "";
    let allChars = "";

    allChars += lowerCase.checked ? lowerChars : "";
    allChars += upperCase.checked ? upperChars : "";
    allChars += number.checked ? allNumber : "";
    allChars += symbol.checked ? allSymbol: "";

    if(allChars == "" || allChars.length == 0){
        return genPassword;
    }

    let i = 1;
    while(i <= inputSlider.value){
        genPassword += allChars.charAt(Math.floor(Math.random() * allChars.length));
        i++;
    }
   
    return genPassword;
    
}

copyIcon.addEventListener("click", ()=>{
    if(passBox != "" || passBox.value.length >=1 ){
        navigator.clipboard.writeText(passBox.value);
        copyIcon.innerText = "check";
        copyIcon.title = "password copied";

        setTimeout(()=>{
        copyIcon.innerHTML = " content_copy";
        copyIcon.title = "";
        }, 3000)
    }
})
   
   