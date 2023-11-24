const inputTask = document.querySelector('.inputTask');
const btnTask = document.querySelector('.addtask');
const tasksList = document.querySelector('.tasks');

function criaTask(inputText) {
    const li = criaLi();
    li.innerText = inputText;
    tasksList.appendChild(li);
    limpaInput()
    criaBtnDelete(li)
    salvarTask();
}
function criaLi() {
    const li = document.createElement('li');
    return li;
}
function criaBtnDelete(li) {
    li.innerText += ' ';
    const btnDelete = document.createElement('button');
    btnDelete.innerText = 'Delete';
    btnDelete.setAttribute('class', 'apagar');
    li.appendChild(btnDelete);
}
function limpaInput() {
    inputTask.value = '';
    inputTask.focus();
}
inputTask.addEventListener('keypress', (e)=>{
    if(e.keyCode === 13){
        if(!inputTask.value) return;
        criaTask(inputTask.value);
    }
})
function salvarTask() {
    const liTasks = tasksList.querySelectorAll('li');
    const taskList = [];

    for (let task of liTasks){
        let taskText = task.innerText;
        taskText = taskText.replace('Delete', '').trim();
        taskList.push(taskText);
    }

    const taskJSON = JSON.stringify(taskList);
    localStorage.setItem('tasks', taskJSON);
}
function returnTaskSave() {
    const tasks = localStorage.getItem('tasks');
    const taskList = JSON.parse(tasks);

    for (let task of taskList){
        criaTask(task);
    }
}
document.addEventListener('click', (e)=>{
    const el = e.target;
    if (el.classList.contains('apagar')){
        el.parentElement.remove();
        salvarTask();
    }
})
btnTask.addEventListener('click', ()=>{
    if(!inputTask.value) return;
    criaTask(inputTask.value);
})
returnTaskSave();
