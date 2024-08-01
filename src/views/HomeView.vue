<script setup lang="ts">
import { ref } from 'vue';
import CitiesNavBar from '@/components/CitiesNavBar.vue';
import NextDays from '@/components/NextDays.vue';
import NextHours from '@/components/NextHours.vue';

// Define the type for the city object
type City = {
  id: number;
  name: string;
  country: string;
};

let activeCity = ref<City>({
  id: 3,
  name: 'Los Angeles',
  country: 'United States'
}
);

const cities: City[] = [
  { id: 1, name: 'Rio de Janeiro', country: 'Brazil' },
  { id: 2, name: 'Beijing', country: 'China' },
  { id: 3, name: 'Los Angeles', country: 'United States' }
];

const updateActiveCity = (newCity: City) => {
  activeCity.value = newCity;
};

</script>

<template>
  <CitiesNavBar :activeCity="activeCity" :cities="cities" @update:activeCity="updateActiveCity"></CitiesNavBar>

  <main>

    <NextHours :activeCity="activeCity"></NextHours>
    <NextDays :activeCity="activeCity"></NextDays>

  </main>
</template>

<style lang="scss" scoped>
main {
  padding: 1.2rem;
  background-color: blue;
  background-image: linear-gradient(to bottom, #10588a 30%, #0ca7c6 60%, #e4ecf1 60%, #e4ecf1 100%);
  flex-grow: 1;
}
</style>