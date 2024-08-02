<script setup lang="ts">
import { ref, defineProps, defineEmits, onMounted } from 'vue';
import CitiesNavBar from '@/components/CitiesNavBar.vue';
import NextDays from '@/components/NextDays.vue';
import NextHours from '@/components/NextHours.vue';

const props = defineProps<{
  activeCity: Object;
}>();

const cities: Object[] = [
  { city_id: 3451190, city_name: 'Rio de Janeiro', lat: -22.90278, lon: -43.2075 }, //3451190,Rio de Janeiro,21,BR,Brazil,-22.90278,-43.2075
  { city_id: 1816670, city_name: 'Beijing', lat: 39.9075, lon: 116.39723 }, //1816670,Beijing,22,CN,Paracel Islands,39.9075,116.39723
  { city_id: 5368361, city_name: 'Los Angeles', lat: 34.05223, lon: -118.24368 } //5368361,Los Angeles,CA,US,United States,34.05223,-118.24368
];

let lastUpdated = ref(null);

const emit = defineEmits(['selectCity']);

const updateActiveCity = (newCity: Object) => {
  emit('selectCity', newCity);
  setUpdatedTime();
};

const setUpdatedTime = () => {
  lastUpdated.value = new Date().toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true // Use this for AM/PM format. Set to false for 24-hour format
  });
}

onMounted(() => {
  setUpdatedTime();
});

</script>

<template>
  <CitiesNavBar :activeCity="props.activeCity" :cities="cities" @update:activeCity="updateActiveCity"></CitiesNavBar>

  <main>

    <NextHours :activeCity="props.activeCity"></NextHours>
    <NextDays :activeCity="props.activeCity"></NextDays>


    <div class="background-container">

    </div>
  </main>

  <footer class="bg-primary p-2 d-flex align-items-center justify-content-center">
    <div class="text-white">
      Last updated {{ lastUpdated }}
    </div>
  </footer>
</template>

<style lang="scss" scoped>
main {
  padding: 1.2rem;
  flex-grow: 1;
}

.background-container {
  z-index: -1;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #3f5fba;
  background-image: linear-gradient(to bottom, #3f5fba 30%, #3788c0 60%, #e4ecf1 60%, #e4ecf1 100%);
}
</style>