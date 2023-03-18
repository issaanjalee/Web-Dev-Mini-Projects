const inputField = document.querySelector('input[type="text"]');
const todoList = document.querySelector('.todo-list');
let tasks = [];
function addTask(text) {
    tasks.push({ text: text, completed: false, completedAt: null });
}
function renderTasks() {
    todoList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        if (task.completed) {
            li.classList.add('completed');
        }
        const textSpan = document.createElement('span');
        textSpan.classList.add('text');
        textSpan.innerText = task.text;
        const actionsDiv = document.createElement('div');
        actionsDiv.classList.add('actions');
        if (task.completed) {
            const completedAtSpan = document.createElement('span');
            completedAtSpan.classList.add('completed-at');
            completedAtSpan.innerText = new Date(task.completedAt).toLocaleString();
            actionsDiv.appendChild(completedAtSpan);
        } else {
            const completeButton = document.createElement('button');
            completeButton.innerText = '✓';
            completeButton.addEventListener('click', () => {
                tasks[index].completed = true;
                tasks[index].completedAt = Date.now();
                renderTasks();
            });
            actionsDiv.appendChild(completeButton);
        }

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'X';
        deleteButton.addEventListener('click', () => {
            tasks.splice(index, 1);
            renderTasks();
        });

        actionsDiv.appendChild(deleteButton);

        li.appendChild(textSpan);
        li.appendChild(actionsDiv);

        todoList.appendChild(li);
    });
}
inputField.addEventListener('keydown', event => {
    if (event.keyCode === 13) {
        addTask(event.target.value);
        event.target.value = '';
        renderTasks();
    }
});
const markAllButton = document.querySelector('#mark-all');
markAllButton.addEventListener('click', () => {
    tasks.forEach(task => {
        if (!task.completed) {
            task.completed = true;
            task.completedAt = Date.now();
        }
    });
    renderTasks();
});
const clearCompletedButton = document.querySelector('#clear-completed');
clearCompletedButton.addEventListener('click', () => {
    tasks = tasks.filter(task => !task.completed);
    renderTasks();
});

renderTasks();
