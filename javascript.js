let taskInput = document.querySelector('.task-input');
let addButton = document.querySelector('.add-btn');
let toDoList = document.querySelector('.todo-list');
let searchBar = document.querySelector('.search-bar');
let toDoAdd = document.querySelector('.todo-add');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// ---------------------------Create unordered List---------------------------------

let ul = document.createElement('ul');
toDoList.appendChild(ul);

tasks.forEach(task => {
    addTask(task.text, false, task.isDone);
});

// ---------------------------Add Button click--------------------------------------

addButton.addEventListener('click', () => {
    let taskInputValue = taskInput.value.trim();

    let existingAlert = document.querySelector('.alert-content p');

    if (!taskInputValue) {

        // Show alert 
        if (!existingAlert) {
            let alert = document.createElement('p');
            alert.innerHTML = 'Please enter a task';
            alert.style.color = 'red';
            alert.style.paddingLeft = '10px';
            document.querySelector('.alert-content').appendChild(alert);
        }

        return;
    }

    if (existingAlert) {
        existingAlert.remove();
    }

    addTask(taskInputValue, true, false);

    taskInput.value = '';
});

// -------------------------Adding Task---------------------------------------------

function addTask(taskText, save, isDone = false) {
    // To DO Task List
    let taskList = document.createElement('li');
    ul.appendChild(taskList);

    // To DO Task List Items
    let taskListItem = document.createElement('span');
    taskListItem.textContent = taskText;
    taskList.appendChild(taskListItem);

    if(isDone){
        taskListItem.classList.add('line-through');
    }
    
    // Line Through Done Tasks
    taskList.addEventListener('click', () => {
        taskListItem.classList.toggle('line-through');
        updateTaskStatus(taskText, taskListItem.classList.contains('line-through'));
    });

    // Delete Button
    let deleteButton = document.createElement('button');
    deleteButton.classList.add('trash');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';

    taskList.appendChild(deleteButton);

    // Delete Tasks 
    deleteButton.addEventListener('click', () => {
        ul.removeChild(taskList);

        tasks = tasks.filter(t => t.text !== taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    });

    if (save) {
        tasks.push({text: taskText, isDone});
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

};

function updateTaskStatus(taskText, isDone){
    tasks = tasks.map(task =>
        task.text === taskText ? { ...task, isDone} : task
        );
        localStorage.setItem('tasks', JSON.stringify(tasks));
}
// ---------------------------------Search Bar--------------------------------------

let search = document.querySelector('.search');

// Create Search List
let searchList = document.createElement('ul');
search.appendChild(searchList);

// Searching Tasks
searchBar.addEventListener('keyup', (element) => {
    let searchValue = element.target.value.toLowerCase().trim();

    searchList.innerHTML = '';

    let found = false;

    // Create Search List Item
    let listItems = ul.querySelectorAll('li');

    // Searching
    listItems.forEach((item) => {
        let taskText = item.querySelector('span').textContent.toLowerCase();

        if (taskText.includes(searchValue)) {
            let searchListItem = document.createElement('li');
            searchListItem.textContent = item.querySelector('span').textContent;
            searchList.appendChild(searchListItem);
            found = true;
        }

    });

    if (!found && searchValue) {
        let searchListItem = document.createElement('li');
        searchListItem.textContent = "No such task";
        searchList.appendChild(searchListItem);
    }

    if (searchValue === '') {
        searchList.innerHTML = '';
    }
});