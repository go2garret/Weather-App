<script setup lang="ts">
import { ref, defineProps, onMounted, watch } from 'vue';
import WeatherSection from './WeatherSection.vue';
import { Cities } from '@/classes/Cities'

// Define the type for the city object
type City = {
    city_id: number;
    city_name: string;
    lat: number;
    lon: number;
};

const props = defineProps<{
    activeCity: City;
}>();

const _Cities = new Cities();

const forecast = ref<Object | null>(null);

let loading = false;

watch(
    () => props.activeCity,
    async (newCity) => {
        loading = true;
        const { lat, lon } = newCity;
        try {
            const response = await _Cities.getHourlyForecast(lat, lon);
            forecast.value = response; // Assign the data directly
        } catch (error) {
            console.error('Error fetching forecast:', error);
        } finally {
            loading = false;
        }
    },
    { immediate: true }
);

</script>

<template>
    <WeatherSection style="overflow-x: auto">

        <template #title>
            Next hours
        </template>

        <template #body>
            <div v-if="loading" class="text-secondary px-3">
                Loading...
            </div>
            <div class="d-flex p-3" v-if="forecast && !loading">
                <div v-for="row in forecast.list.splice(0, 12)" :key="row.dt"
                    class="d-inline-flex flex-column align-items-center justify-content-center">

                    <div>
                        <b>{{ Math.round(row.main.temp) }}°</b>
                    </div>

                    <div class="text-info">
                        {{ row.main.humidity }}%
                    </div>

                    <div>
                        <img :src="`https://openweathermap.org/img/wn/${row.weather[0]?.icon}@2x.png`">
                    </div>

                    <div class="text-secondary" :title="row.dt_txt">
                        {{ new Date(row.dt_txt).toLocaleTimeString('en-US', {
                            hour: 'numeric', minute: 'numeric',
                            hour12: true
                        }) }}
                    </div>

                </div>
            </div>
        </template>

    </WeatherSection>
</template>
