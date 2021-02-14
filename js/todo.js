const toDoForm = document.querySelector('.js-toDoForm'),
    toDoInput = toDoForm.querySelector('input'),
    toDoList = document.querySelector('.js-toDoList'); 


const TODOS_LS = 'todos';

let toDos = [];



function deleteTodo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}






function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos))  //JSON.stringify 는 자바스크립트의 object를 문자열로 바꿔줌

}

let idNumbers = 1;

function paintTodo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = idNumbers;
    idNumbers += 1;
    delBtn.innerText="X";
    delBtn.addEventListener("click", deleteTodo);
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