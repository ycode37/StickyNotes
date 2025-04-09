const addBtn = document.getElementById('addbtn');
const todoContainer = document.getElementById('todo-container');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveTodo() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function createTodo(id, text = '', x = 100, y = 100) {
  const todo = document.createElement('li');
  todo.classList.add('todo');
  todo.contentEditable = true;
  todo.innerText = text;
  todo.style.left = x + 'px';
  todo.style.bottom = y + 'px';

  todo.oninput = () => {
    const updated = todos.find((n) => n.id == id);
    updated.text = todo.innerText;
    saveTodo();
  };

  todoContainer.appendChild(todo);
}

addBtn.onclick = () => {
  console.log('Helloß!!');
  const id = Date.now();
  const newTodo = { id, text: '', x, y };
  todos.push(newTodo);
  createNote(id);
  saveTodo();
};

todos.forEach((todo) => createTodo(todo.id, todo.text, todo.x, todo.y));
