<script setup lang="ts">
import { ref } from 'vue';

let showSearch = ref(false);

function toggleSearch() {
  showSearch.value = !showSearch.value;
}

</script>

<template>
  <header>
    <div class="wrapper">
      <h1>Simple Weather</h1>

      <nav class="searchIcon" @click.prevent="toggleSearch">

        <svg v-if="showSearch" width="35" height="35" viewBox="0 0 24 24" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M6 6L18 18M18 6L6 18" stroke="#ffffff" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>

        <svg v-else width="35" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
            stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

      </nav>

    </div>

    <div v-if="showSearch" class="pb-1">
      <input v-if="showSearch" type="text" placeholder="Search by city" />
    </div>

  </header>

  <RouterView />
</template>

<style lang="scss" scoped>
header {
  background-color: #2960c0;
  line-height: 1.5;
  max-height: 100vh;
  color: #ffffff;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;

  h1 {
    font-size: 1.5rem;
  }

  .searchIcon {
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .wrapper {
    padding: 8px 8px 0 8px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  nav {
    font-size: 12px;
    text-align: center;
  }

  nav a.router-link-exact-active {
    color: var(--color-text);
  }

  nav a.router-link-exact-active:hover {
    background-color: transparent;
  }

  nav a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
  }

  nav a:first-of-type {
    border: 0;
  }
}

@media (min-width: 1024px) {}
</style>
