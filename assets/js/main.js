const addButton = document.querySelector('.add-task');
const showAllBtn = document.getElementById('all')
const showCompletedBtn = document.getElementById('completed')
const showActiveBtn = document.getElementById('active')
// Function to animate the racket
const animateRacket = (racket, animationType) => {
    racket.classList.add(animationType);
    racket.addEventListener('animationend', function () {
        racket.classList.remove(animationType);
    }, { once: true });
}

// Function to update tasks count
const updateTasksCount = (tasksCount) => {
    tasksCount.forEach(item => {
        item.textContent = todoList.tasks.length + 1;
    });
}
// Create Task List Item
function createTaskListItem(task, index) {
    const listItem = document.createElement('li');
    const textItem = document.createElement('p');
    const descriptionItem = document.createElement('p');
    const checkbox = document.createElement('input');
    const deleteButton = document.createElement('button');

    deleteButton.className = 'delete-icon';
    checkbox.type = "checkbox";
    textItem.textContent = task.headline;
    descriptionItem.textContent = task.description
    listItem.appendChild(checkbox);
    listItem.appendChild(textItem);
    listItem.appendChild(descriptionItem)
    listItem.appendChild(deleteButton);

    deleteButton.addEventListener('click', () => todoList.deleteTask(index));

    checkbox.checked = task.completed;

    checkbox.addEventListener('click', function (e) {
        task.completed = e.target.checked;
        todoList.getCount();
    });
    return listItem;
}
// Remove Active Class From FIlter Button
const removeActiveClass = () => {
    const tabButtons = document.querySelectorAll('.todo-tabs button');

    tabButtons.forEach(item => {
        item.classList.remove('active')
    })
}
// Remove Data Index From Buttons Container
const removedataIndex = (elem) => {
    elem.removeAttribute('data-index')
}

// Task object constructor
function Task(headline,description) {
    this.headline = headline;
    this.description = description
    this.completed = false;
}

// ToDoList object constructor
function ToDoList() {
    this.tasks = [];
}

// Method to add a new task to the ToDoList
ToDoList.prototype.addTask = function (headline,description) {
    let newTask = new Task(headline,description);
    this.tasks.push(newTask);
}

// Method to filter tasks
ToDoList.prototype.getCount = function () {
    const tasksDone = document.getElementById('done');
    let completedCount = 0;
    this.tasks.forEach(item => {
        if (item.completed) {
            completedCount++;
        }
    });

    tasksDone.textContent = completedCount;
}

// Method Remove Item
ToDoList.prototype.deleteTask = function (index) {
    const tabsBox = document.querySelector('.todo-tabs')
    const tabName = tabsBox.getAttribute('data-index')
    this.tasks.splice(index, 1);
    // Display right items on delete
    if (tabName === 'active') {
        this.displayActiveTasks()
    } else if (tabName === 'completed') {
        this.displayCompletedTasks();
    } else {
        this.displayTasks()
    }
    let tasksCount = document.querySelectorAll('.all-count');
    // Edit count text dynamicly
    tasksCount.forEach(item => {
        item.textContent = todoList.tasks.length
    })
    todoList.getCount()
}
// Method to display tasks in the ToDoList
ToDoList.prototype.displayTasks = function () {
    let taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    this.tasks.forEach((task, index) => {
        let listItem = createTaskListItem(task, index);
        taskList.appendChild(listItem);
    });
}
// Method to display only completed tasks in the ToDoList
ToDoList.prototype.displayCompletedTasks = function () {
    let taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    this.tasks.forEach((task, index) => {
        if (task.completed) {
            let listItem = createTaskListItem(task, index);
            taskList.appendChild(listItem);
        }
    });
}
// Method to display only active tasks in the ToDoList
ToDoList.prototype.displayActiveTasks = function () {
    let taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    this.tasks.forEach((task, index) => {
        if (!task.completed) {
            let listItem = createTaskListItem(task, index);
            taskList.appendChild(listItem);
        }
    });
}
// Event listener for adding tasks
document.getElementById('addTaskBtn').addEventListener('click', function () {
    let taskInput = document.getElementById('taskInput');
    let taskDescription = document.getElementById('taskDescription');
    let taskText = taskInput.value.trim();
    let taskDescriptionText = taskDescription.value.trim();
    console.log(todoList)

    // Get elements related to tasks count and animation
    let tasksCount = document.querySelectorAll('.all-count');
    let racket = document.querySelector('.racket');
    taskDescription.value = ' '
    // Check if the task text is not empty
    if (taskText !== '') {
        animateRacket(racket, 'move');
        updateTasksCount(tasksCount);
        // Add task and display tasks
        todoList.addTask(taskText,taskDescriptionText);
        todoList.displayTasks();
        taskInput.value = '';
    } else {
        // Animate the racket when input is empty
        animateRacket(racket, 'shake');
    }
});
// Show All Taksk
showAllBtn.addEventListener('click', function () {
    todoList.displayTasks();
    removeActiveClass();
    this.classList.add('active');
});
// Show Completed Tasks
showCompletedBtn.addEventListener('click', function () {
    const tabsBox = document.querySelector('.todo-tabs')
    removedataIndex(tabsBox)
    tabsBox.setAttribute('data-index', 'completed')
    todoList.displayCompletedTasks()
    removeActiveClass()
    this.classList.add('active')
})
// Show Active Taksk
showActiveBtn.addEventListener('click', function () {
    const tabsBox = document.querySelector('.todo-tabs')
    removedataIndex(tabsBox)
    tabsBox.setAttribute('data-index', 'active')
    todoList.displayActiveTasks()
    removeActiveClass()
    this.classList.add('active')
})
// Create an instance of ToDoList
let todoList = new ToDoList();

console.log(todoList)

