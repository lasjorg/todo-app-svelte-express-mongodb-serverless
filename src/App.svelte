<script>
  import { v4 as uuidv4 } from 'uuid';
  import AddTodo from './components/AddTodo.svelte';
  import TodoList from './components/TodoList.svelte';
  import TodoFilters from './components/TodoFilters.svelte';
  import { onMount } from 'svelte';

  import { getTodos, addTodo, updateTodo, deleteTodo } from './utils/api';

  let todos = [];
  let todoText;
  let isCompleted,
    isUncompleated = false;

  $: totalTodos = todos.length;
  $: totalCompleated = todos.filter((todo) => todo.completed).length;
  $: totalUncompleated = totalTodos - totalCompleated;

  onMount(async () => {
    todos = await getTodos();
    console.log(todos);
  });

  const handleAddTodo = async ({ detail: { todoText } }) => {
    if (todoText) {
      todos = await addTodo({ text: todoText, completed: false });
      todoText = '';
    }
  };

  const handleDeleteTodo = async (todoId) => {
    todos = await deleteTodo(todoId);
  };

  const handleEditTodo = async ({ event, todoId, value: text }) => {
    text = text.trim();

    if (event.key === 'Enter' || event.type === 'blur') {
      event.target.blur();
      // on empty input str set element text back to the original todo text
      if (text.length === 0) {
        todos.forEach((todo) => {
          if (todo._id === todoId) event.target.value = todo.text;
        });
        return;
      }

      const { completed } = todos.filter((todo) => todo._id === todoId)[0];

      todos = await updateTodo({ _id: todoId, text, completed });
    }
  };

  const handleChecked = async ({ todoId }) => {
    const todo = todos.find((todo) => todo._id === todoId);
    todo.completed = !todo.completed;
    todos = await updateTodo(todo);
  };

  const toggleCompleated = () => {
    isCompleted = true;
    isUncompleated = false;
  };

  const toggleUncompleated = () => {
    isUncompleated = true;
    isCompleted = false;
  };

  const toggleAll = () => {
    isUncompleated = false;
    isCompleted = false;
  };
</script>

<style>
  h1 {
    margin: 20px 0;
  }
  .container {
    width: 100%;
    max-width: 680px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 40px;
    font-family: 'Poppins', sans-serif;
  }
</style>

<div class="container">
  <h1 class="title is-1">Svelte Todo App</h1>
  <TodoFilters
    on:toggleCompleated={toggleCompleated}
    on:toggleUncompleated={toggleUncompleated}
    on:toggleAll={toggleAll}
    {totalCompleated}
    {totalUncompleated}
    {totalTodos} />
  <AddTodo on:addTodo={handleAddTodo} />

  <TodoList
    {todos}
    {isCompleted}
    {isUncompleated}
    on:deleteTodo={({ detail }) => handleDeleteTodo(detail)}
    on:editTodo={({ detail }) => handleEditTodo(detail)}
    on:checkTodo={({ detail }) => handleChecked(detail)} />
</div>
