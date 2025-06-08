const taskInput = document.getElementById('taskInput');
const dueDateInput = document.getElementById('dueDateInput');
const dueTimeInput = document.getElementById('dueTimeInput');
const prioritySelect = document.getElementById('prioritySelect');
const addTaskBtn = document.getElementById('addTaskBtn');
const resetBtn = document.getElementById('resetBtn');
const darkModeBtn = document.getElementById('darkModeBtn');
const taskList = document.getElementById('taskList');
const body = document.body;
const h1 = document.querySelector('h1');


//Input Task
addTaskBtn.addEventListener('click', function () {
    const taskText = taskInput.value.trim();
    const dueDate = dueDateInput.value;
    const dueTime = dueTimeInput.value;
    const priority = prioritySelect.value;

    if (taskText === '' || dueDate === '' || dueTime === '' || priority === 'Priority Select') {
        alert('Please enter all fields');
        return;
    }

    const taskContent = document.createElement('div');
    const li = document.createElement('li');
    const dateTime = document.createElement('p');
    const checkbox = document.createElement('input');
    const editBtn = document.createElement('span');
    const deleteBtn = document.createElement('span');

    taskContent.textContent = taskText;
    taskContent.className = 'task-content';

    dateTime.textContent = `Date: ${dueDate} || Time: ${dueTime}`;
    dateTime.className = 'task-date';

    editBtn.textContent = '✏️';
    editBtn.title = 'Edit-task';
    editBtn.className = 'task-icon';
    editBtn.addEventListener('click', function() {
        taskInput.value = taskText;
        dueDateInput.value = dueDate;
        dueTimeInput.value = dueTime;
        prioritySelect.value = priority;
        li.remove();
    });

    deleteBtn.textContent = '❌';
    deleteBtn.title = 'Delete-task';
    deleteBtn.className = 'task-icon';
    deleteBtn.addEventListener('click', function() {
        li.remove();
        return;
    });

    checkbox.type = 'checkbox';
    checkbox.className = 'task-icon';
    checkbox.addEventListener('change', function() {
        li.classList.toggle('done', checkbox.checked);
    });

    if (priority === 'high') {
        li.style.borderLeft = '1.2em solid red';
    } else if (priority === 'medium') {
        li.style.borderLeft = '1em solid orange';
    } else if (priority === 'low') {
        li.style.borderLeft = '1em solid green';
    }


    taskList.appendChild(li);
    li.appendChild(taskContent);
    li.appendChild(dateTime);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    li.appendChild(checkbox);

    //after
    taskInput.value = '';
    dueDateInput.value = '';
    dueTimeInput.value = '';
    prioritySelect.value = 'Select Priority';

    li.scrollIntoView({ behavior: 'smooth' });
});

//reset
resetBtn.addEventListener('click', function() {
    taskInput.value = '';
    dueDateInput.value = '';
    dueTimeInput.value = '';
    prioritySelect.value = 'Select Priority';
});

//darkmode
darkModeBtn.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
    h1.classList.toggle('change-theme');
    taskInput.classList.toggle('change-input');
    dueDateInput.classList.toggle('change-input');
    dueTimeInput.classList.toggle('change-input');
    prioritySelect.classList.toggle('change-input');
    text.classList.toggle('change-label');
});