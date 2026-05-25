// todo.js
class Task {
    constructor(text) {
        this.id = Date.now().toString();
        this.text = text;
        this.done = false;
    }

    toggle() {
        this.done = !this.done;
    }
}

class TodoList {
    constructor() {
        this.tasks = [];
    }

    add(text) {
        if (!text.trim()) return;
        const task = new Task(text.trim());
        this.tasks.push(task);
        return task;
    }

    remove(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }

    getActive() {
        return this.tasks.filter(task => !task.done);
    }

    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) task.toggle();
    }
}

// Ініціалізація
const todo = new TodoList();

const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

function render() {
    taskList.innerHTML = '';
    todo.tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.text;
        if (task.done) li.classList.add('done');
        li.dataset.id = task.id;
        taskList.appendChild(li);
    });
}

// Додавання
addBtn.addEventListener('click', () => {
    todo.add(taskInput.value);
    taskInput.value = '';
    render();
});

// Делегування подій
taskList.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        todo.toggleTask(e.target.dataset.id);
        render();
    }
});