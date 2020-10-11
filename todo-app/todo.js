
document.addEventListener("DOMContentLoaded", getTodos);

// Select the <input> tag in the HTML
const inputText = document.querySelector("#enterATask");

// Select the <button> tag in the HTML, and disable it initally
const addTaskButton = document.querySelector("#addTask");
addTaskButton.disabled = true;

// Add an event listener to the <input> tag. If there's no text currently in it,
// Disable the "Add Task" button, otherwise, enable it. 
inputText.addEventListener('input', ()=>{
    // addTaskButton.disabled = true;
    if (inputText.value == "") {
        addTaskButton.disabled = true;
    }
    else addTaskButton.disabled = false;
})

// Add a click event listener to the button. 
addTaskButton.addEventListener("click", (event)=> {

    // When clicked, create a div, which contains a checkbox, the task to be accomplished, and a trashcan to allow the user to delete the task when complete
    let taskDiv = document.createElement("div");
    taskDiv.className = "task";
    let inputDiv = document.createElement("div");
    
    let inputElement = document.createElement("input");
    inputElement.setAttribute("type", "checkbox");
    inputElement.setAttribute("id", "item");
    inputElement.setAttribute("name", "item");
    
    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", "item");
    
    let trashCanIcon = document.createElement("i");
    trashCanIcon.className = "fas fa-trash";
    
    let text = document.createTextNode(inputText.value);
    
    taskDiv.appendChild(inputDiv);
    inputDiv.appendChild(inputElement)
    inputDiv.appendChild(labelElement);
    labelElement.appendChild(text);
    taskDiv.appendChild(trashCanIcon);
    document.body.appendChild(taskDiv);

    // Save to local storage
    saveLocalTodos(inputText.value);

    // Make the value reset to empty string after clicking "Add Task" button; disable the button when doing so
    inputText.value = "";
    addTaskButton.disabled = true;
})

// Add an event listener which adds a task upon pressing the "Enter" key on your keyboard
inputText.addEventListener("keydown", (event)=> {
    // If there's no text in the form, don't allow user to press enter and submit an empty task
    if (event.keyCode === 13 && inputText.value == "") {
        event.preventDefault();
    }
    // Otherwise if there is text in the input, let the user click "enter"
    else if (event.keyCode === 13 && inputText.value != "") {
    let taskDiv = document.createElement("div");
    taskDiv.className = "task";
    let inputDiv = document.createElement("div");
    
    let inputElement = document.createElement("input");
    inputElement.setAttribute("type", "checkbox");
    inputElement.setAttribute("id", "item");
    inputElement.setAttribute("name", "item");
    
    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", "item");
    
    let trashCanIcon = document.createElement("i");
    trashCanIcon.className = "fas fa-trash";
    
    let text = document.createTextNode(inputText.value);
    
    taskDiv.appendChild(inputDiv);
    inputDiv.appendChild(inputElement)
    inputDiv.appendChild(labelElement);
    labelElement.appendChild(text);
    taskDiv.appendChild(trashCanIcon);
    document.body.appendChild(taskDiv);

    // Add to local storage
    saveLocalTodos(inputText.value);

    // After the "enter" key is submitted, clear the input, and disable the button again
    inputText.value = "";
    addTaskButton.disabled = true;
    }
})

// Add an event listener to prevent the page from refreshing every time "enter" is pressed
inputText.addEventListener("keydown", event=> {
    if (event.keyCode === 13) {
        event.preventDefault();
    }
})

// Add event listeners to detect when the checkbox is selected
document.body.addEventListener("click", event=> {

    // When selected, strike through the <label> text to indicate that the task has been completed
    if (event.target.checked == true) {
        event.target.nextSibling.style.textDecoration = "line-through";
        event.target.disabled = true;
        console.log(event.target);
    }
    // If the trash can is clicked, remove the task (div) entirely
    if (event.target.nodeName == "I") {
        event.target.parentNode.remove();
        removeLocalTodos(event.target.parentNode);
    }
})

    
// Add to local storage
function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    // Add a data item to local storage
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Remove from local storage
function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
  }

// Get todos on page load, if todos exist
function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(todo=> {
        let taskDiv = document.createElement("div");
        taskDiv.className = "task";
        let inputDiv = document.createElement("div");
        
        let inputElement = document.createElement("input");
        inputElement.setAttribute("type", "checkbox");
        inputElement.setAttribute("id", "item");
        inputElement.setAttribute("name", "item");
        
        let labelElement = document.createElement("label");
        labelElement.setAttribute("for", "item");
        
        let trashCanIcon = document.createElement("i");
        trashCanIcon.className = "fas fa-trash";
        
        let text = document.createTextNode(todo);
        
        taskDiv.appendChild(inputDiv);
        inputDiv.appendChild(inputElement)
        inputDiv.appendChild(labelElement);
        labelElement.appendChild(text);
        taskDiv.appendChild(trashCanIcon);
        document.body.appendChild(taskDiv);
    })
}

