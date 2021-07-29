//Selectors
const todoInput = document.querySelector(".todo-input");
const todoBtn = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todos");

//EventListner for fetching data from local storage
document.addEventListener('DOMContentLoaded', getTodos)

//EventListners
todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);


//function::: ADD Todos
function addTodo(e) {
  //prevent page from reloading
  e.preventDefault();

  //create a new DIV
  const todoDiv = document.createElement("div"); //create a new div

  todoDiv.classList.add("todo"); //add class to new div

  const newTodo = document.createElement("li"); //add new li to div

  newTodo.innerText = todoInput.value; // add a value to li

  newTodo.classList.add("todo-item"); // add a class to li

  todoDiv.appendChild(newTodo);

  //Save Todos to localstorage:::
  saveLocalTodos(todoInput.value);

  //create a complete(check-mark) button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  //create a Trash Button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  //Append the above todoDiv class to todo-list
  todoList.appendChild(todoDiv);

  //clear the input value from textinput field
  todoInput.value = "";
}


//function::: Deleting and Fading Todos
function deleteCheck(e) {
  const item = e.target;

  //Delete a todo
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;

    //Animation for deletion
    todo.classList.add("fall");

    removeLocalTodos(todo)

    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //Mark the the todo complete
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}


//function::: Filtering Todos
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}


//function:::localstorage of Todos
function saveLocalTodos(todo) {
  //Check whether todos are already save or not
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}


//function::: Get data from localstorage to frontend
function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    //create a new DIV
    const todoDiv = document.createElement("div"); //create a new div

    todoDiv.classList.add("todo"); //add class to new div

    const newTodo = document.createElement("li"); //add new li to div

    newTodo.innerText = todo; // add a value to li

    newTodo.classList.add("todo-item"); // add a class to li

    todoDiv.appendChild(newTodo);

    //create a complete(check-mark) button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //create a Trash Button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //Append the above todoDiv class to todo-list
    todoList.appendChild(todoDiv);
  });
}


//function::: To update the localStorage
function removeLocalTodos(todo){
    let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText
  todos.splice(todos.indexOf(todoIndex),1)
  localStorage.setItem("todos", JSON.stringify(todos))
}