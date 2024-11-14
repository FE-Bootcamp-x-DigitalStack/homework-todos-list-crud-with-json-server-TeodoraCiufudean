let todos = [];

(async function init() {
  // Fetch todos from database
  todos = await server.getTodos();

  // Render todos to UI
  ui.renderTodos(todos);
  console.log(todos);
})();
