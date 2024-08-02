<script setup lang="ts">
import { ref } from 'vue';
import SearchCities from '@/components/SearchCities.vue';

// Set default selected city
let activeCity = ref<Object>({
  city_id: 5368361,
  city_name: 'Los Angeles',
}
);

let showSearch = ref(false);

function toggleSearch() {
  showSearch.value = !showSearch.value;
}

// Select city at app level, and pass to child components
function selectCity(city: Object) {
  activeCity.value = city;
}

</script>

<template>
  <header>
    <div class="wrapper">
      <h1>Simple Weather</h1>

      <nav class="searchIcon cursor-pointer" @click.prevent="toggleSearch">

        <svg v-if="showSearch" width="35" height="35" viewBox="0 0 24 24" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M6 6L18 18M18 6L6 18" stroke="#ffffff" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>

        <svg v-else width="35" height="35" class="pb-1" viewBox="0 0 24 24" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
            stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

      </nav>

    </div>

    <div v-if="showSearch" class="w-100">
      <SearchCities v-on:selectCity="selectCity"></SearchCities>
    </div>

  </header>

  <RouterView :activeCity="activeCity" v-on:selectCity="selectCity" />
</template>

<style lang="scss" scoped>
header {
  background-color: #27388b;
  line-height: 1.5;
  max-height: 100vh;
  color: #ffffff;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;

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
