document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
    document.getElementById('add-task').addEventListener('click', addTask);
    document.getElementById('new-task').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Using event delegation for handling clicks on the task list
    document.getElementById('task-list').addEventListener('click', function(e) {
        if (e.target.classList.contains('delete-task')) {
            e.target.parentElement.remove();
            saveTasks();
        } else if (e.target.classList.contains('edit-task')) {
            // Edit task logic remains unchanged
        } else if (e.target.classList.contains('task-text')) {
            // Toggle completion state
            e.target.classList.toggle('completed');
            saveTasks();
        }
    });
});

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskValue = taskInput.value;
    const taskCategory = document.getElementById('task-category').value;
    const taskDate = document.getElementById('task-date').value;
    const taskTime = document.getElementById('task-time').value;
    if (taskValue.trim() !== '') {
        const li = document.createElement('li');
        li.innerHTML = `<span class="task-text">${taskValue} - ${taskCategory}
                        <small>${taskDate} ${taskTime}</small></span>
                        <button class="edit-task">Edit</button>
                        <button class="delete-task">Delete</button>`;
        // Add click listener to toggle completion state
        li.querySelector('.task-text').addEventListener('click', function() {
            this.classList.toggle('completed');
        });
        document.getElementById('task-list').appendChild(li);
        taskInput.value = '';
        document.getElementById('task-date').value = '';
        document.getElementById('task-time').value = '';
        saveTasks();
    }
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(function(taskLi) {
        const taskText = taskLi.querySelector('.task-text').textContent;
        const isCompleted = taskLi.querySelector('.task-text').classList.contains('completed');
        tasks.push({text: taskText, completed: isCompleted});
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.forEach(function(task) {
        const li = document.createElement('li');
        li.innerHTML = `<span class="task-text${task.completed ? ' completed' : ''}">${task.text}</span>
                        <button class="edit-task">Edit</button>
                        <button class="delete-task">Delete</button>`;
        document.getElementById('task-list').appendChild(li);
    });
}
