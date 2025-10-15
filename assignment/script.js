const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render tasks on page load
window.addEventListener('DOMContentLoaded', () => {
  renderTasks();
});

// Add Task
addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  const newTask = {
    id: Date.now(),
    text: taskText,
    completed: false
  };

  tasks.push(newTask);
  updateLocalStorage();
  renderTasks();
  taskInput.value = '';
});

// Render task list
function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';
    li.textContent = task.text;

    const actions = document.createElement('div');
    actions.className = 'actions';

    // Complete button
    const completeBtn = document.createElement('button');
    completeBtn.innerHTML = '✅';
    completeBtn.title = 'Mark as done';
    completeBtn.onclick = () => {
      task.completed = !task.completed;
      updateLocalStorage();
      renderTasks();
    };

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '🗑️';
    deleteBtn.title = 'Delete task';
    deleteBtn.onclick = () => {
      tasks = tasks.filter(t => t.id !== task.id);
      updateLocalStorage();
      renderTasks();
    };

    actions.appendChild(completeBtn);
    actions.appendChild(deleteBtn);
    li.appendChild(actions);

    taskList.appendChild(li);
  });
}

// Update localStorage
function updateLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
