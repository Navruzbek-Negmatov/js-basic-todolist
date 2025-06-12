const elForm = document.getElementById("js-form");
const elInput = document.getElementById("input");
const elTemplate = document.querySelector(".js-todo-temp").content;
const elList = document.querySelector(".el-todo-list");

let todos = [];

function todoRender(arr) {
    let elFragment = document.createDocumentFragment();
    elList.innerHTML = "";
    arr.forEach(todo => {
        let clone = elTemplate.cloneNode(true);
        clone.querySelector('.js-todo-title').textContent = todo.title;
        clone.querySelector(".js-del-list-btn").dataset.id = todo.id;
        clone.querySelector(".js-edit-list-btn").dataset.id = todo.id;
        // console.log(todo)
        elFragment.append(clone);
    });
    elList.append(elFragment);
};

elForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    let todoTitle = elInput.value;

    if (!todoTitle) return alert("Enter required infos!");

    let newTodo = {
        id: todos.length + 1,
        title: todoTitle
    };

    todos.push(newTodo);
    todoRender(todos);
    elInput.value = "";
    elInput.focus();
});

window.addEventListener("click", function (evt) {
    if (evt.target.className == ("js-del-list-btn")) {
        let id = evt.target.dataset.id;
        let indx = todos.findIndex(todo => todo.id == id);
        todos.splice(indx, 1);
        todoRender(todos);
    };

    if (evt.target.matches(".js-edit-list-btn")) {
        let id = evt.target.dataset.id;
        let indx = todos.findIndex(todo => todo.id == Number(id));
        let newInput = prompt("Enter new value",todos[indx].title);
        todos[indx].title = newInput;
        todoRender(todos)
    };
});
