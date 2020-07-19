<script>
  import TodoItem from './TodoItem.svelte';
  export let todos, isCompleted, isUncompleated;
</script>

<style>
  .todos {
    width: 100%;
    margin-top: 20px;
  }
</style>

<div class="todos">

  {#each todos as todo (todo._id)}
    <TodoItem
      {todo}
      {isCompleted}
      {isUncompleated}
      on:deleteTodo
      on:editTodo
      on:checkTodo />
  {/each}

</div>
