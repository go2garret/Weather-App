<script setup lang="ts">
import { ref, defineProps, watch } from 'vue';
import WeatherSection from './WeatherSection.vue';
import { Cities } from '@/classes/Cities'

const props = defineProps<{
    activeCity: Object;
}>();

const _Cities = new Cities();

const forecast = ref<Object | null>(null);

let loading = ref(false);

const loadCity = async (city = props.activeCity) => {
    loading.value = true;
    const { city_name } = city;
    try {
        const response = await _Cities.getHourlyForecast(city_name);
        forecast.value = response;
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
        loadCity()
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
                <div v-for="row in forecast.list.splice(0, 12)" :key="row.dt" class="d-flex align-items-center">

                    <div class="d-inline-flex flex-column align-items-center justify-content-center px-2">

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

                    <div class="border-right border-muted" style="height: 75%">

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

.text-info {
    font-weight: 500;
    color: #00b3da !important;
}
</style>