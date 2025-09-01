const container = document.querySelector(".container");
const addQuestionCard = document.getElementById("add-question-card");
const cardButton = document.getElementById("save-btn");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const errorMessage = document.getElementById("error");
const addQuestion = document.getElementById("Add-flashcard");
const closeButton = document.getElementById("close-btn");


let editBool = false;

addQuestion.addEventListener("click", () => {
    container.classList.add("hide");
    question.value = "";
    answer.value = "";
    addQuestionCard.classList.remove("hide");
});

closeButton.addEventListener("click", (hideQuestion = () => {
    container.classList.remove("hide");
    addQuestionCard.classList.add("hide");
    if (editBool) {
        editBool = false;
        sumitQuestion();
    }
}));

cardButton.addEventListener("click", (sumitQuestion = () => {
    editBool = false;
    let tempQuestion = question.value.trim();
    let tempAnswer = answer.value.trim();
    if (!tempAnswer || !tempQuestion) {
        errorMessage.classList.remove("hide");
    } else {
        errorMessage.classList.add("hide");
        addQuestionCard.classList.add("hide");//self
        container.classList.remove("hide");

        viewlist();
        question.value = "";
        question.value = "";
    }
}));

function viewlist() {
    var listCard = document.querySelector(".cardlist-container")
    var div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `<p class ="question-div">${question.value}</p>`;

    var link = document.createElement("a");
    link.setAttribute("href", "#");
    link.setAttribute("class", "show-hide-btn");
    link.innerHTML = "Show / Hide";
    link.addEventListener("click", () => {
        displayAswer.classList.toggle("hide")
    });

    var displayAswer = document.createElement("p");
    displayAswer.classList.add("answer-div", "hide");
    displayAswer.innerText = answer.value;

    let buttonCon = document.createElement("div");
    buttonCon.classList.add("button-con");
    var editButton = document.createElement("button");
    editButton.setAttribute("class","edit");
    editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
    editButton.addEventListener("click",()=>{
        editBool = true;
        modifyElement(editButton,true);
        addQuestionCard.classList.remove("hide");
    })

    var deleteButton = document.createElement("button");
    deleteButton.setAttribute("class","delete");
    deleteButton.innerHTML=`<i class="fa-solid fa-trash"></i>`
    deleteButton.addEventListener("click",()=>{
        editBool = false;
        modifyElement(deleteButton,false)
    })

    buttonCon.appendChild(editButton);
    buttonCon.appendChild(deleteButton);
    
    
    div.appendChild(link);
    div.appendChild(displayAswer);
    div.appendChild(buttonCon);
    listCard.appendChild(div);
    hideQuestion();
}

const modifyElement = (Element,edit=false)=>{
    let parentDiv = Element.parentElement.parentElement;
    let parentQuestion = parentDiv.querySelector(".question-div").innerText;
   
    if(edit){
       let parentAns = parentDiv.querySelector(".answer-div").innerText; //modification
        answer.value= parentAns;
        question.value = parentQuestion;
         
        // disableButton(true);
    }
    parentDiv.remove()
};

const disableButton = (value) =>{
    let editButton = document.getElementsByClassName("edit");
    Array.from(editButton).forEach((Element)=>{
        Element.disabled = value;
    });
};



