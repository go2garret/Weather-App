<script setup lang="ts">
import { ref, defineProps, watch } from 'vue';
import WeatherSection from './WeatherSection.vue';
import { Cities } from '@/classes/Cities'

const props = defineProps<{
    activeCity: Object;
}>();

const _Cities = new Cities();

const forecast = ref<any>(null);

var loading = ref(false);

const dateFormat = ref({
    weekday: 'short',
    month: 'short',
    day: 'numeric'
});

// Get Daily Forecast using one of the daytime results. 
// This is a hack because the daily results require additional authorization.
let forecastList = ref(null);

const loadCity = async (city = props.activeCity as { city_name: string }) => {
    loading.value = true;
    const { city_name } = city;
    try {
        const response = await _Cities.getDailyForecast(city_name);
        forecast.value = response;
        forecastList.value = forecast.value.list.filter((row: any) => row.dt_txt.endsWith('21:00:00'));
    } catch (error) {
        console.error('Error fetching forecast:', error);
    } finally {
        loading.value = false;
    }
}

// Expose the method to the parent via `expose`
defineExpose({
    loadCity
});

watch(
    () => props.activeCity,
    async (newCity) => {
        loadCity(newCity)
    },
    { immediate: true }
);

</script>

<template>
    <WeatherSection style="overflow-x: auto">

        <template #title>
            Next {{ forecastList?.length }} days
        </template>

        <template #body>
            <div v-if="loading" class="text-secondary px-3">
                Loading...
            </div>
            <div class="p-3" v-if="forecast && !loading">
                <div v-for="row in forecastList" :key="row.dt"
                    class="w-full d-flex align-items-center border-bottom mx-auto" style="max-width:680px">

                    <div class="col-3">
                        <img :src="`https://openweathermap.org/img/wn/${row.weather[0]?.icon}@2x.png`">
                    </div>

                    <div class="col-6 text-center">
                        <div class="fs-4 fw-medium" :title="row.dt_txt">
                            {{ new Date(row.dt_txt).toLocaleDateString('en-US', dateFormat) }}
                        </div>
                        <div class="text-secondary fw-medium">
                            {{ row.weather[0].description.slice(0, 1).toUpperCase() +
                                row.weather[0].description.slice(1) }}.
                        </div>
                    </div>

                    <ul class="col-3 m-0 fs-5 list-unstyled d-flex justify-content-end">
                        <li class="me-2 fw-medium">{{ Math.round(row.main.temp_max) }}°</li>
                        <li class="fw-medium">{{ Math.round(row.main.temp_min) }}°</li>
                    </ul>
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