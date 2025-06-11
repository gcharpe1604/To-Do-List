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
const change = document.getElementById('change');
const change1 = document.getElementById('change1');

// Save tasks to localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(li => {
        const content = li.querySelector('.task-content').textContent;
        const dateTimeText = li.querySelector('.task-date').textContent;
        const [date, time] = dateTimeText.replace('Date: ', '').split(' || Time: ');
        const border = li.style.borderLeft;
        const priority = border.includes('red') ? 'high' : border.includes('orange') ? 'medium' : 'low';
        const isDone = li.classList.contains('done');
        tasks.push({ content, date, time, priority, isDone });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => {
        taskInput.value = task.content;
        dueDateInput.value = task.date;
        dueTimeInput.value = task.time;
        prioritySelect.value = task.priority;
        addTaskBtn.click();
        const lastTask = taskList.lastChild;
        if (task.isDone) {
            lastTask.classList.add('done');
            lastTask.querySelector('input[type="checkbox"]').checked = true;
        }
    });
}

// Save dark mode state
function saveDarkModeState(isDark) {
    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
}

// Load dark mode state
function loadDarkModeState() {
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        h1.classList.add('change-theme');
        taskInput.classList.add('change-input');
        dueDateInput.classList.add('change-input');
        dueTimeInput.classList.add('change-input');
        prioritySelect.classList.add('change-input');
        change.classList.add('change-label');
        change1.classList.add('change-label');
    }
}

//Input Task
addTaskBtn.addEventListener('click', function () {
    const taskText = taskInput.value.trim();
    const dueDate = dueDateInput.value;
    const dueTime = dueTimeInput.value;
    const priority = prioritySelect.value;

    if (taskText === '' || dueDate === '' || dueTime === '' || priority === 'Priority Select') {
        alert('Please enter in all fields');
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
    editBtn.addEventListener('click', function () {
        taskInput.value = taskText;
        dueDateInput.value = dueDate;
        dueTimeInput.value = dueTime;
        prioritySelect.value = priority;
        li.remove();
        saveTasks();
    });

    deleteBtn.textContent = '❌';
    deleteBtn.title = 'Delete-task';
    deleteBtn.className = 'task-icon';
    deleteBtn.addEventListener('click', function () {
        li.remove();
        saveTasks();
    });

    checkbox.type = 'checkbox';
    checkbox.className = 'task-icon';
    checkbox.addEventListener('change', function () {
        li.classList.toggle('done', checkbox.checked);
        saveTasks();
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

    taskInput.value = '';
    dueDateInput.value = '';
    dueTimeInput.value = '';
    prioritySelect.value = 'Select Priority';

    li.scrollIntoView({ behavior: 'smooth' });
    saveTasks();
});

//reset
resetBtn.addEventListener('click', function () {
    taskInput.value = '';
    dueDateInput.value = '';
    dueTimeInput.value = '';
    prioritySelect.value = 'Select Priority';
});

//darkmode
darkModeBtn.addEventListener('click', function () {
    const isDark = body.classList.toggle('dark-mode');
    h1.classList.toggle('change-theme');
    taskInput.classList.toggle('change-input');
    dueDateInput.classList.toggle('change-input');
    dueTimeInput.classList.toggle('change-input');
    prioritySelect.classList.toggle('change-input');
    change.classList.toggle('change-label');
    change1.classList.toggle('change-label');
    saveDarkModeState(isDark);
});

// Load everything on page load
window.addEventListener('DOMContentLoaded', () => {
    loadDarkModeState();
    loadTasks();
});
