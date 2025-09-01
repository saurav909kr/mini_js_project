let firstNameInput = document.getElementById("first-name-input");
let firstNameError = document.getElementById("first-name-error");
let emptyFirstNameError = document.getElementById("empty-first-name");

let lastNameInput = document.getElementById("last-name-input");
let lastNameError = document.getElementById("last-name-error");
let emptylastNameError = document.getElementById("empty-last-name");

let emailInput = document.getElementById("Email");
let emailError = document.getElementById("email-error");
let emptyEmail = document.getElementById("empty-email");

let phoneInput = document.getElementById("phone");
let phoneError = document.getElementById("phone-error");
let emptyPhone = document.getElementById("empty-phone");

let passwordInput = document.getElementById("password");
let passwordError = document.getElementById("password-error");
let emptyPassword = document.getElementById("empty-password");

let verifyPasswordInput = document.getElementById("verify-password");
let verifyPasswordError = document.getElementById("varify-password-error");
let emptyPasswordError = document.getElementById("verify-password-error");

let sumitButton = document.getElementById("summit-button");

let validClasses = document.getElementsByClassName("valid");
let invalidClass = document.getElementsByClassName("error");

const passwordVerify = (password) =>{
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    return regex.test(password) && password.length >= 8;
                        
};

const textVerify = (text) => {
    const regex = /^[a-zA-Z]{3,}$/;
    return regex.test(text);
};

const phoneVerify = (number)=>{
    const regex = /^[0-9]{10}$/;
    return regex.test(number);
};

const emailVerify = (input) =>{
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(input);
};

const emptyUpdate = (inputReference,emptyErrorReference,otherErrorReference)=>{
    if(!inputReference.value){
        emptyErrorReference.classList.remove("hide");
        otherErrorReference.classList.add("hide");
        inputReference.classList.add("error");
    }else{
        emptyErrorReference.classList.add("hide");
    }

};

const errorUpdate = (inputReference,errorReference) =>{
    errorReference.classList.remove("hide");
    inputReference.classList.remove("valid");
    inputReference.classList.add("error");
}

const validInput = (inputReference)=>{
    inputReference.classList.remove("error"); // what its need
    inputReference.classList.add("valid");
}

firstNameInput.addEventListener("input",()=>{
    if(textVerify(firstNameInput.value)){
        firstNameError.classList.add("hide");
        validInput(firstNameInput);
    }else{
        errorUpdate(firstNameInput,firstNameError);
        emptyUpdate(firstNameInput,emptyFirstNameError,firstNameError);
    }
});

lastNameInput.addEventListener("input",()=>{
    if(textVerify(lastNameInput.value)){
        lastNameError.classList.add("hide");
        validInput(lastNameInput);
    }else{
        errorUpdate(lastNameInput,lastNameError);
        emptyUpdate(lastNameInput,emptylastNameError,lastNameError)
    }
});

phoneInput.addEventListener("input",()=>{
    if(phoneVerify(phoneInput.value)){
        phoneError.classList.add("hide");
        validInput(phoneInput);
    } else {
        errorUpdate(phoneInput,phoneError);
        emptyUpdate(phoneInput,emptyPhone,phoneError)
    }
});

emailInput.addEventListener("input",()=>{
    if(emailVerify(emailInput)){
        emailError.classList.add("hide");
        validInput(emailInput);
    } else {
        errorUpdate(emailInput,emailError);
        emptyUpdate(emailInput,emptyEmail,emailError);
    }
});

passwordInput.addEventListener("input",()=>{
    if(passwordVerify(passwordInput.value)){
        passwordError.classList.add("hide");
        validInput(passwordInput);
    } else{
        errorUpdate(passwordInput,passwordError);
        emptyUpdate(passwordInput,emptyPasswordError,passwordError);
    }
});

verifyPasswordInput.addEventListener("input",()=>{
    if(verifyPasswordInput.value === passwordInput.value){
        verifyPasswordError.classList.add("hide");
        validInput(verifyPasswordInput);
    } else{
        errorUpdate(verifyPasswordInput,verifyPasswordError);
        emptyUpdate(passwordInput,emptyPasswordError,verifyPasswordError)
    }
});

sumitButton.addEventListener("click",()=>{
    if(validClasses.length == 6 && invalidClass.length == 0){
        alert("Success")
    }else{
        alert("Error")
    }
});