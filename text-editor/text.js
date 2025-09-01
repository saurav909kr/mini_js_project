const optionButton = document.querySelectorAll(".option-button");
const advButton = document.querySelectorAll(".adv-option-button");
const fontName = document.getElementById("font-name");
const fontSize = document.getElementById("font-size");
const textInput = document.getElementById("text-input");
const linkButton = document.getElementById("createLink");
const alignButton = document.querySelectorAll(".option-button-align");
const spacingButton = document.querySelectorAll(".option-button-spacing");
const formatButton = document.querySelectorAll(".format");//
const scriptButton = document.querySelectorAll(".option-button-script");//

let fontList = ["Arial","Verdana","Times New Roman","Garamond","Georgia","Courier New","cursive"]

window.onload = initializer = () => {
      highlighter(alignButton,true);
      highlighter(spacingButton,true);
      highlighter(formatButton,false);
      highlighter(scriptButton,true);
      // highlighter(optionButton,true);
      // highlighter(advButton,true);


      fontList.map((value) =>{
        let option = document.createElement("option");
        option.value = value;
        option.innerHTML = value;
        fontName.appendChild(option);
      });

      for(let i = 1; i <=7; i++){
        let option = document.createElement("option");
        option.value = i;
        option.innerHTML = i;
        fontSize.appendChild(option);
      };

      fontSize.value =3;
};

const modifyText = (command , defaultUi , value) =>{
  document.execCommand(command,defaultUi,value);
}


optionButton.forEach((button)=>{
  button.addEventListener("click",()=>{
    modifyText(button.id, false, null);
  })
});


advButton.forEach((button)=>{
  button.addEventListener("change",()=>{
    modifyText(button.id , false , button.value);
  })
})

linkButton.addEventListener("click",()=>{
  let userLink = prompt("Enter the Url");
  if (/http/i.test(userLink)){
    modifyText(linkButton.id , false , userLink)
  } else {
    userLink = "http://" + userLink;
    modifyText(linkButton.id, false , userLink);
  }
})




const highlighter = (className , needsRemoval) => {
    className.forEach((button) => {
        
      button.addEventListener("click",()=>{
        if(needsRemoval){

           let alreadyActive = false;

           if(button.classList.contains("active")){
            alreadyActive = true;
            
           }
           highlighterRemover(className);
           if(!alreadyActive){
            button.classList.add("active");
           }
        } else {
            button.classList.toggle("active");
        }
      });
    });
};

const highlighterRemover = (className)=>{
  className.forEach((button)=>{
    button.classList.remove("active");
  });
};

window.onload = initializer();

