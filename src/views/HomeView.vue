<script setup lang="ts">
import { ref } from 'vue';
import CitiesNavBar from '@/components/CitiesNavBar.vue';
import NextDays from '@/components/NextDays.vue';
import NextHours from '@/components/NextHours.vue';

// Define the type for the city object
type City = {
  city_id: number;
  city_name: string;
  lat: number;
  lon: number;
};

let activeCity = ref<City>({
  city_id: 5368361,
  city_name: 'Los Angeles',
  lat: 34.05223,
  lon: -118.24368
}
);

const cities: City[] = [
  { city_id: 3451190, city_name: 'Rio de Janeiro', lat: -22.90278, lon: -43.2075 }, //3451190,Rio de Janeiro,21,BR,Brazil,-22.90278,-43.2075
  { city_id: 1816670, city_name: 'Beijing', lat: 39.9075, lon: 116.39723 }, //1816670,Beijing,22,CN,Paracel Islands,39.9075,116.39723
  { city_id: 5368361, city_name: 'Los Angeles', lat: 34.05223, lon: -118.24368 } //5368361,Los Angeles,CA,US,United States,34.05223,-118.24368
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