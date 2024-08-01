<script setup lang="ts">
import { defineProps } from 'vue';

// Define the type for the city object
type City = {
    id: number;
    name: string;
    country: string;
};

const props = defineProps<{
    activeCity: City;
    cities: City[];
}>();

const emit = defineEmits(['update:activeCity']);

const setActive = (city: Object) => {
    emit('update:activeCity', city);
};

</script>

<template>

    <nav>
        <ul class="list-unstyled d-flex w-100 items-center m-0 px-3">

            <li class="py-3 me-3 text-uppercase text-secondary" :class="{ 'active': props.activeCity.id == city.id }"
                v-for="city in cities" :key="city.id" @click.prevent="setActive(city)">

                {{ city.name }}

            </li>

        </ul>
    </nav>

</template>

<style lang="scss" scoped>
li {
    cursor: pointer;
    font-weight: 700;
    letter-spacing: -0.1px;

    &.active {
        color: #000000 !important;
        border-bottom: 2px solid #f75123;
    }
}
</style>