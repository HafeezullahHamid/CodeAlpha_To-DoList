const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage on startup
document.addEventListener("DOMContentLoaded", loadTasks);

addTaskBtn.addEventListener("click", addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const task = { text: taskText, completed: false };
    addTaskToList(task);
    saveTask(task);

    taskInput.value = "";
}

function addTaskToList(task) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = task.text;
    li.appendChild(span);

    if (task.completed) li.classList.add("completed");

    const completeBtn = document.createElement("button");
    completeBtn.innerHTML = "✔️";
    completeBtn.addEventListener("click", () => {
        li.classList.toggle("completed");
        updateStorage();
    });

    const editBtn = document.createElement("button");
    editBtn.innerHTML = "✏️";
    editBtn.addEventListener("click", () => {
        const newText = prompt("Edit your task:", span.textContent);
        if (newText) {
            span.textContent = newText;
            updateStorage();
        }
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "🗑️";
    deleteBtn.addEventListener("click", () => {
        li.remove();
        updateStorage();
    });

    li.appendChild(completeBtn);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
}

function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(addTaskToList);
}

function updateStorage() {
    const allTasks = [];
    document.querySelectorAll("#taskList li").forEach((li) => {
        allTasks.push({
            text: li.querySelector("span").textContent,
            completed: li.classList.contains("completed"),
        });
    });
    localStorage.setItem("tasks", JSON.stringify(allTasks));
}
