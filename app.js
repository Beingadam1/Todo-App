const form = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const filter = document.querySelector('#filter');
const clearBtn = document.querySelector('#clear-todo');
const todoCollection = document.querySelector('.todos');

// All Event Listeners
form.addEventListener('submit', addTodo);
filter.addEventListener('keyup', filterTodo);
clearBtn.addEventListener('click', clearTodo);
todoCollection.addEventListener('click', deleteTodo);

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

    todoInput.value = '';
  }
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
}
