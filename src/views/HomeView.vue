<script setup lang="ts">
import { ref, defineProps, defineEmits, onMounted } from 'vue';
import type { Ref } from 'vue';
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

let lastUpdated: Ref<string | null> = ref(null);

const emit = defineEmits(['selectCity', 'refresh']);

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
    hour12: true
  });
}

const nextHoursRef = ref<InstanceType<typeof NextHours> | null>(null);
const nextDaysRef = ref<InstanceType<typeof NextDays> | null>(null);

const refresh = () => {
  emit('refresh', props.activeCity);

  if (nextHoursRef.value) {
    nextHoursRef.value.loadCity();
  }
  if (nextDaysRef.value) {
    nextDaysRef.value.loadCity();
  }
}

onMounted(() => {
  setUpdatedTime();
});

</script>

<template>
  <CitiesNavBar :activeCity="props.activeCity" :cities="cities" @update:activeCity="updateActiveCity"></CitiesNavBar>

  <main>

    <NextHours :activeCity="props.activeCity" ref="nextHoursRef"></NextHours>
    <NextDays :activeCity="props.activeCity" ref="nextDaysRef"></NextDays>


    <div class="background-container">

    </div>
  </main>

  <footer class="p-2 pb-3 d-flex align-items-center justify-content-center flex-column">

    <button class="btn text-center mx-auto d-flex justify-content-center align-items-center text-white"
      @click.prevent="refresh">
      <div class="fs-6 fw-medium me-1">Refresh</div>
      <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M21 3V8M21 8H16M21 8L18 5.29168C16.4077 3.86656 14.3051 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.2832 21 19.8675 18.008 20.777 14"
          stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>

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

footer {
  background-color: #27388b;
}

.background-container {
  z-index: -1;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #303a6c;
  background-image: linear-gradient(to bottom, #3f5fba 30%, #3788c0 60%, #e4ecf1 60%, #e4ecf1 100%);
}
</style>