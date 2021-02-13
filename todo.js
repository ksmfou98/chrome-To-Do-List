const toDoForm = document.querySelector('.js-toDoForm'),
    toDoInput = toDoForm.querySelector('input'),
    toDoList = document.querySelector('.js-toDoList'); 


const TODOS_LS = 'todos';

const toDos = [];


function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos))  //JSON.stringify 는 자바스크립트의 object를 문자열로 바꿔줌

}



function paintTodo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText="X";
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);

    const toDoObj = {
        text : text,
        id : newId

    };
    toDos.push(toDoObj);
    saveToDos();
}



function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintTodo(currentValue);
    toDoInput.value="";
}



function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);

    if (loadedToDos != null){
        const parsedToDos = JSON.parse(loadedToDos);  // JSON.parse 는 위에서 object를 문자열로 바꿔준걸 다시 풀어주는거임
        parsedToDos.forEach(function(toDo){
            paintTodo(toDo.text);
        });
    }
}


function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
}

init();