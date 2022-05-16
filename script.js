const TASK_INPUT = document.getElementById('new-task');
const ADD_BUTTON = document.getElementsByTagName('button')[0];
const WORK_TASK_HOLDER = document.getElementById('in-process-tasks');
const DONE_TASK_HOLDER = document.getElementById('completed-tasks');

const createNewTaskElement = function(taskString) {

    const listItem = document.createElement('li');
    const checkBox = document.createElement('input');
    const label = document.createElement('label');
    const editInput = document.createElement('input');
    const editButton = document.createElement('button');    
    const deleteButton = document.createElement('button');    

    label.innerText = taskString;
    label.className = 'task';

    checkBox.type = 'checkbox';
    checkBox.setAttribute('id', 'checkbox');
    editInput.type = 'text';
    editInput.className = 'task';

    editButton.innerText = 'Edit';
    editButton.className = 'edit';

    deleteButton.innerText = 'Delete';
    deleteButton.className = 'delete';    

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}

const initialize = function() {
    if (!localStorage.getItem('todos')) {
        const listItem = createNewTaskElement('Here is your first task');
        WORK_TASK_HOLDER.appendChild(listItem);        
    }

    if (localStorage.getItem('todos' || 'done')) {
        const workItemStructure = localStorage.getItem('todos');
        const workItemEmptyNode = document.getElementById('in-process-tasks');
        workItemEmptyNode.innerHTML = workItemStructure;
        
        const doneItemStructure = localStorage.getItem('done');
        const doneItemEmptyNode = document.getElementById('completed-tasks');
        doneItemEmptyNode.innerHTML = doneItemStructure;       

        WORK_TASK_HOLDER.append(workItemEmptyNode);
        DONE_TASK_HOLDER.append(doneItemEmptyNode);       
    }

    editTask();

    // ADD_BUTTON.addEventListener ('click', addTask);    
}

const addTask = function() {        
    if (!TASK_INPUT.value) return;
    const listItem = createNewTaskElement(TASK_INPUT.value);
    
    WORK_TASK_HOLDER.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    TASK_INPUT.value = '';    
}

const editTask = function(){
    const listItem = this.parentNode;    

    const editInput = listItem.querySelector('input[type = text]');
    const label = listItem.querySelector('label');
    const editBtn = listItem.querySelector('.edit');
    const containsClass = listItem.classList.contains('edit-mode');
    
    if(containsClass) {
        label.innerText = editInput.value;
        editBtn.innerText = 'Edit';
    }

    if(!containsClass) {
        editInput.value = label.innerText;
        editBtn.innerText = 'Save';
    }
    
    listItem.classList.toggle('edit-mode');
}

const updateStorage = function() {
    const todoNode = document.getElementById('in-process-tasks');
    const doneNode = document.getElementById('completed-tasks');

    console.log(todoNode.innerHTML);
    console.log(doneNode.innerHTML);

    localStorage.todos = '';
    localStorage.todos = todoNode.innerHTML;

    localStorage.done = '';
    localStorage.done = doneNode.innerHTML;
}

const deleteTask = function () {
    const listItem = this.parentNode;
    const ul = listItem.parentNode;    
    ul.removeChild(listItem);
}

const taskCompleted = function () {    
    const listItem = this.parentNode;
    DONE_TASK_HOLDER.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

const taskIncomplete = function () {    
    const listItem = this.parentNode;
    WORK_TASK_HOLDER.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}

ADD_BUTTON.onclick = addTask;
ADD_BUTTON.addEventListener ('click', addTask);

document.addEventListener ('DOMContentLoaded', initialize);

window.addEventListener ('unload', updateStorage);

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    const checkBox = taskListItem.querySelector('input[type = checkbox]');
    const editButton = taskListItem.querySelector('button.edit');
    const deleteButton = taskListItem.querySelector('button.delete');
    
    editButton.onclick = editTask;    
    deleteButton.onclick = deleteTask;    
    checkBox.onchange = checkBoxEventHandler;
}

for (let i = 0; i < WORK_TASK_HOLDER.children.length; i++) {
    bindTaskEvents(WORK_TASK_HOLDER.children[i], taskCompleted);
}

for (let i = 0; i < DONE_TASK_HOLDER.children.length; i++){    
    bindTaskEvents(DONE_TASK_HOLDER.children[i],taskIncomplete);
}
