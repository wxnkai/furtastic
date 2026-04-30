// Initialize an empty array to store todo items
let todoList = [];

// Function to render a todo item
function renderTodoItem(todo) {
    // Store the todoList array in local storage
    localStorage.setItem("todoList", JSON.stringify(todoList));

    // Select the todo list element by class
    const list = document.querySelector(".todo-list");
    const existingItem = document.querySelector(`[data-key='${todo.id}']`);

    if (todo.deleted) {
        // Remove the item if it's marked as deleted
        existingItem.remove();
        return;
    }

    // Check if the item is checked and apply the 'done' class accordingly
    const isCheckedClass = todo.checked ? "done" : "";

    // Create a new list item
    const newItem = document.createElement("li");
    newItem.setAttribute("class", `todo-item ${isCheckedClass}`);
    newItem.setAttribute("data-key", todo.id);
    newItem.innerHTML = `
        <input id="${todo.id}" type="checkbox"/>
        <label for="${todo.id}" class="tick js-tick"></label>
        <span>${todo.text}</span>
        <button class="delete-todo js-delete-todo">
            <svg fill="var(--svgcolor)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
            </svg>
        </button>
    `;

    if (existingItem) {
        // Replace the existing item with the new one
        list.replaceChild(newItem, existingItem);
    } else {
        // Append the new item to the list
        list.append(newItem);
    }
}

// Function to add a new todo item
function addTodoItem(text) {
    // Create a new todo object
    const todoObject = {
        text,
        checked: false,
        id: Date.now(),
    };

    // Add the new todo object to the todoList array
    todoList.push(todoObject);

    // Render the new todo item
    renderTodoItem(todoObject);
    console.log(todoList);
}

// Function to toggle the 'done' status of a todo item
function toggleTodoDone(itemId) {
    const index = todoList.findIndex((item) => item.id === Number(itemId));
    todoList[index].checked = !todoList[index].checked;
    renderTodoItem(todoList[index]);
}

// Function to delete a todo item
function deleteTodoItem(itemId) {
    const index = todoList.findIndex((item) => item.id === Number(itemId));
    const deletedTodo = {
        deleted: true,
        ...todoList[index],
    };
    todoList = todoList.filter((item) => item.id !== Number(itemId));
    renderTodoItem(deletedTodo);
}

// Select the form
const form = document.querySelector(".formselect");

// Add a submit event listener to the form
form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Select the input field
    const input = document.querySelector(".inputselect");

    // Trim whitespace from the input value
    const inputValue = input.value.trim();

    // Check if the input value is not empty
    if (inputValue !== "") {
        // Call the function to add a new todo item
        addTodoItem(inputValue);
        // Clear the input field after submission
        input.value = "";
    }
});

// Select the entire todo list
const todoListElement = document.querySelector(".js-todo-list");

// Add a click event listener to the todo list
todoListElement.addEventListener("click", (event) => {
    if (event.target.classList.contains("js-tick")) {
        const itemId = event.target.parentElement.dataset.key;
        toggleTodoDone(itemId);
    }

    if (event.target.classList.contains("js-delete-todo")) {
        const itemId = event.target.parentElement.dataset.key;
        deleteTodoItem(itemId);
    }
});

// Load saved todo items from local storage when the page is loaded
document.addEventListener("DOMContentLoaded", () => {
    const savedTodoList = localStorage.getItem("todoList");
    if (savedTodoList) {
        todoList = JSON.parse(savedTodoList);
        todoList.forEach((item) => {
            renderTodoItem(item);
        });
    }
});