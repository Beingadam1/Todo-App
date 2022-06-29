const form = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const filter = document.querySelector('#filter');
const clearBtn = document.querySelector('#clear-todo');
const todoCollection = document.querySelector('.todos');

// All Event Listeners
document.addEventListener('DOMContentLoaded', getTodo);
form.addEventListener('submit', addTodo);
filter.addEventListener('keyup', filterTodo);
clearBtn.addEventListener('click', clearTodo);
todoCollection.addEventListener('click', deleteTodo);

// Get Todo from LS
function getTodo() {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.forEach((todo) => {
    const html = `
    <div class="todo-item">
          <span>${todo}</span><i class="fa fa-trash delete"></i>
        </div>
    `;

    todoCollection.insertAdjacentHTML('beforeend', html);
  });
}

// Add Todo
function addTodo(e) {
  e.preventDefault();

  if (todoInput.value === '') {
    alert('Enter a todo');
  } else {
    const html = `
    <div class="todo-item">
          <span>${todoInput.value}</span><i class="fa fa-trash delete"></i>
        </div>
    `;

    todoCollection.insertAdjacentHTML('beforeend', html);

    // Store Todo
    storeTodoInLS(todoInput.value);

    todoInput.value = '';
  }
}

// Store Todo In LS
function storeTodoInLS(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.push(todo);

  localStorage.setItem('todos', JSON.stringify(todos));
}

// Filter Todo
function filterTodo(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.todo-item').forEach(function (todo) {
    const item = todo.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      todo.style.display = 'flex';
    } else {
      todo.style.display = 'none';
    }
  });
}

// Delete Todo
function deleteTodo(e) {
  if (e.target.classList.contains('delete')) {
    e.target.parentElement.remove();
  }
}

// Clear Todo
function clearTodo() {
  todoCollection.innerHTML = '';

  // Clear from LS
  clearTodoFromLS();
}

function clearTodoFromLS() {
  localStorage.clear();
}
