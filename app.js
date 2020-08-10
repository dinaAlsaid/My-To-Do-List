'use strict'

// var submit = document.getElementById("submitBtn");
var todoForm = document.getElementById("todoForm");
var todoTable = document.getElementById("todoTable");
var tasksArr =[];

// form submission event handler

function Task (newTask, newDate, urgencyLvl){
    this.task = newTask;
    this.date = newDate;
    this.urgency = urgencyLvl;
    tasksArr.push(this);
}

todoForm.addEventListener('submit', submitForm);
function submitForm(event){
    event.preventDefault();


    var task = new Task (event.target.task.value , event.target.date.value , event.target.urgency.value);
    event.target.task.value = '';
    event.target.date.value ='';
    event.target.urgency.value='medium';
    addToStorage(tasksArr);

    parseString();



}

// add to local storage
function addToStorage(data){
    var jsonString = JSON.stringify(data);
    localStorage.setItem('tasks', jsonString);
}

// parse into an array of objects 
function parseString(){
    var parsedTasks = JSON.parse(localStorage.getItem('tasks'));
    todoTable.innerHTML="<tr><th>Task</th><th>Date</th><th>Urgency</th></tr>";

    for (let i = 0; i < parsedTasks.length; i++) {
        renderTable(parsedTasks[i].task , parsedTasks[i].date , parsedTasks[i].urgency );
        console.log(parsedTasks);
    }
}

function renderTable(newtask , newdate , newurgency ){

    var row = document.createElement('tr');
    var task = document.createElement('td');
    var date = document.createElement('td');
    var urgency = document.createElement('td');

    task.textContent = newtask ;
    date.textContent = newdate;
    urgency.textContent = newurgency ;
    // removeBtn.textContent = "X";

    // removeBtn.setAttribute('onClick','removefunction()');

    row.appendChild(task);
    row.appendChild(date);
    row.appendChild(urgency);
    // row.appendChild(removeBtn);

    todoTable.appendChild(row);
}