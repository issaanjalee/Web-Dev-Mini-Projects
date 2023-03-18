let tasks = [];

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const task = taskInput.value.trim();
  if (task) {
    tasks.push({
      id: Date.now(),
      name: task,
      completed: false,
      completedAt: null,
    });
    taskInput.value = "";
    renderTasks();
  }
}

function renderTasks() {
  const pendingTasks = document.getElementById("pendingTasks");
  const completedTasks = document.getElementById("completedTasks");

  pendingTasks.innerHTML = "";

  completedTasks.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.innerText = task.name;
    li.setAttribute("data-id", task.id);
    li.addEventListener("click", toggleTask);

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", deleteTask);
    li.appendChild(deleteButton);

    if (task.completed) {
      li.classList.add("completed");
      const timeSpan = document.createElement("span");
      timeSpan.innerText = formatTime(task.completedAt);
      li.appendChild(timeSpan);
      completedTasks.appendChild(li);
    } else {
      pendingTasks.appendChild(li);
    }
  });
}

function toggleTask(event) {
  const id = parseInt(event.target.getAttribute("data-id"));
  tasks.forEach((task) => {
    if (task.id === id) {
      task.completed = !task.completed;
      task.completedAt = task.completed ? new Date() : null;
    }
  });
  renderTasks();
}

function deleteTask(event) {
  const id = parseInt(event.target.parentNode.getAttribute("data-id"));
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
}

function formatTime(date) {
  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return date.toLocaleTimeString("en-US", options);
}

renderTasks();
