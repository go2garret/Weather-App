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

let loading = ref(false);

watch(
    () => props.activeCity,
    async (newCity) => {
        loading.value = true;
        const { city_name } = newCity;
        try {
            const response = await _Cities.getHourlyForecast(city_name);
            forecast.value = response; // Assign the data directly
        } catch (error) {
            console.error('Error fetching forecast:', error);
        } finally {
            loading.value = false;
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
                    class="d-inline-flex flex-column align-items-center justify-content-center px-1">

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
                            timeZone: 'America/Los_Angeles',
                            hour: 'numeric', minute: 'numeric',
                            hour12: true
                        }) }}
                    </div>

                </div>
            </div>
        </template>

    </WeatherSection>
</template>

<style lang="scss" scoped>
img {
    width: 68px;
}
</style>