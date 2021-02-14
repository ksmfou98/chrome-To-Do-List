const form = document.querySelector('.js-form'),
    input = form.querySelector('input'),
    greeting = document.querySelector('.js-greeting');


const USER_LS = "currentUser",
    SHOWING_CN = "showing";


function saveName(text){    // 내 컴퓨터에 값을 저장 해두어서 다음에 접속할 때 유지하게 하기  
    localStorage.setItem(USER_LS, text);   //USER_LS = currentUser 이라는 항목1 , text 라는 항목2 만들어서 저장
}




function handleSubmit(event){
    event.preventDefault(); // submit의 새로고침 기능을 막기 위함
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}


function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}




function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN); 
    greeting.innerText = `${text}`;
}


function loadName(){
    const currentUser = localStorage.getItem(USER_LS); 

    if (currentUser === null){
        askForName();
    }
    else{
        paintGreeting(currentUser);
    }
}

function init(){
    loadName();

}



init(); 