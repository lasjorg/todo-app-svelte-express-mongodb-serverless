<script>
  export let totalCompleated, totalUncompleated, totalTodos;

  let isActiveToggleCompleated, isActiveToggleUncompleated, isActiveToggleAll;

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  const handleToggleCompleated = () => {
    dispatch('toggleCompleated');
    isActiveToggleCompleated = true;
    isActiveToggleUncompleated = false;
    isActiveToggleAll = false;
  };

  const handleToggleUncompleated = () => {
    dispatch('toggleUncompleated');
    isActiveToggleCompleated = false;
    isActiveToggleUncompleated = true;
    isActiveToggleAll = false;
  };

  const handleToggleAll = () => {
    dispatch('toggleAll');
    isActiveToggleCompleated = false;
    isActiveToggleUncompleated = false;
    isActiveToggleAll = true;
  };
</script>

<style>
  .filters {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 20px 0;
  }

  .filters button {
    display: flex;
    align-items: center;
  }
  .filters button > svg {
    margin-right: 10px;
  }
  .compleated {
    stroke: #4caf50;
  }
  .uncompleated {
    stroke: #ff9800;
  }
  .all {
    stroke: #2196f3;
  }

  .active {
    border: 2px solid #2196f3;
  }
  button {
    font-family: inherit;
  }
</style>

<h3 class="is-size-5">Todo list filters and stats</h3>
<div class="filters">
  <button
    class={isActiveToggleCompleated ? 'button active' : 'button'}
    on:click={handleToggleCompleated}>
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      stroke-width="2"
      fill="none"
      class="compleated"
      stroke-linecap="round"
      stroke-linejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
    {totalCompleated}
  </button>
  <button
    class={isActiveToggleUncompleated ? 'button active' : 'button'}
    on:click={handleToggleUncompleated}>
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      stroke-width="2"
      fill="none"
      class="uncompleated"
      stroke-linecap="round"
      stroke-linejoin="round">
      <circle cx="12" cy="12" r="10" />
    </svg>
    {totalUncompleated}
  </button>
  <button
    class={isActiveToggleAll ? 'button active' : 'button'}
    on:click={handleToggleAll}>
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      stroke-width="2"
      fill="none"
      class="all"
      stroke-linecap="round"
      stroke-linejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
    {totalTodos}
  </button>
</div>
