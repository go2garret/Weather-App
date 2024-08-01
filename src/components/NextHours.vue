<script setup lang="ts">
import { defineProps } from 'vue';
import WeatherSection from './WeatherSection.vue';

// Define the type for the city object
type City = {
    id: number;
    name: string;
    country: string;
};

const props = defineProps<{
    activeCity: City;
}>();

</script>

<template>
    <WeatherSection>

        <template #title>
            Next hours
        </template>

        <template #body>
            {{ props.activeCity.name }}
        </template>

    </WeatherSection>
</template>

<style lang="scss" scoped></style>
