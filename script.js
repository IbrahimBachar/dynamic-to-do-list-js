// document.addEventListener('DOMContentLoaded', function () {

//     const addButton = document.getElementById('add-task-btn');
//     const taskInput = document.getElementById('task-input');
//     const taskList = document.getElementById('task-list');

//     function addTask() {
//         const taskText = taskInput.value.trim();

//         if (taskText === "") {
//             alert("Please enter a task!");
//             return;
//         }

//         const li = document.createElement('li');
//         li.textContent = taskText;

//         const removeButton = document.createElement('button');
//         removeButton.textContent = "Remove";
//         removeButton.className = "remove-btn";

//         removeButton.onclick = function () {
//             taskList.removeChild(li);
//         };

//         li.appendChild(removeButton);

//         taskList.appendChild(li);

//         taskInput.value = "";
//     }

//     addButton.addEventListener('click', addTask);

//     taskInput.addEventListener('keypress', function (event) {
//         if (event.key === 'Enter') {
//             addTask();
//         }
//     });
// });


document.addEventListener('DOMContentLoaded', function () {

    const addButton = document.getElementById('add-task-btn'); // "Add Task" button
    const taskInput = document.getElementById('task-input'); // Input field for tasks
    const taskList = document.getElementById('task-list'); // Unordered list for tasks

    loadTasks();

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]'); // Retrieve tasks from Local Storage
        storedTasks.forEach(taskText => addTask(taskText, false)); // Add each task to the DOM without saving again
    }

    function addTask(taskText, save = true) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove"; 
        removeButton.classList.add("remove-btn");

        removeButton.onclick = function () {
            taskList.removeChild(li);
            updateLocalStorage();
        };

        li.appendChild(removeButton);

        taskList.appendChild(li);

        if (save) {
            updateLocalStorage();
        }

        taskInput.value = "";
    }

    function updateLocalStorage() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            tasks.push(li.textContent.replace("Remove", "").trim()); // Remove the "Remove" button text
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    addButton.addEventListener('click', function () {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            addTask(taskText);
        } else {
            alert("Please enter a task!");
        }
    });

    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText !== "") {
                addTask(taskText); 
            } else {
                alert("Please enter a task!");
            }
        }
    });
});