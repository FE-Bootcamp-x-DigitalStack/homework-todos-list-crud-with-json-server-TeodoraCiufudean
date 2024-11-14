const dom = {
  todosList: document.querySelector("#todos-list"),
  form: document.querySelector("#form-new-item"),
  inputTitle: document.querySelector("#title"),
  inputDone: document.querySelector("#done"),
};

const ui = {
  renderTodos(todos) {
    dom.todosList.innerHTML = "";
    todos.forEach((todo) => {
      dom.todosList.insertAdjacentHTML(
        "beforeend",
        `<li>
                    <input class="updateBtn" atr-id="${
                      todo.id
                    }" type="checkbox" ${todo.done ? "checked" : ""} id="${
          todo.id
        }"/>
                    <label for="${todo.id}">${todo.title}</label>
                    <button class="deleteBtn" data-id="${todo.id}"> X </button>
                </li>`
      );
    });

    document.querySelectorAll(".deleteBtn").forEach((button) => {
      button.addEventListener("click", (event) => {
        const id = event.target.getAttribute("data-id");
        ui.deleteItem(id);
      });
    });

    document.querySelectorAll(".updateBtn").forEach((checkbox) => {
      checkbox.addEventListener("change", (event) => {
        const id = event.target.getAttribute("atr-id");
        ui.updateItem(event, id);
      });
    });
  },

  async addNewItem(event) {
    event.preventDefault();
    const newItem = {
      title: dom.inputTitle.value,
      done: dom.inputDone.checked,
    };
    //console.log(newItem.done);
    //console.log(title.value);
    const item = await server.addTodo(newItem);
    if (item) {
      //console.log("todo added");
      todos.push(item);
      this.renderTodos(todos);
    } else {
      console.log("can not add new todo");
    }
  },

  async deleteItem(id) {
    const item = await server.deleteTodo(id);
    if (item) {
      todos = todos.filter((todo) => todo.id != id);
      this.renderTodos(todos);
      //console.log("deleted");
    } else {
      console.log("can not delete todo");
    }
  },

  async updateItem(event, id) {
    const done = event.target.checked;
    const updateTodo = { done };
    const updateItem = await server.updateTodo(updateTodo, id);
    if (updateItem) {
      todos.find((todo) => todo.id == id).done = done;
      this.renderTodos(todos);
      //console.log("updated");
    } else {
      console.log("can not update");
    }
  },
};

dom.form.addEventListener("submit", (event) => ui.addNewItem(event));
