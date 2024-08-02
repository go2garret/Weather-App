<script setup lang="ts">
import { ref } from 'vue';


</script>

<template>
    <section class="py-2 bg-white mb-4 rounded-1 shadow">

        <h1 class="py-2 px-3 w-100 sticky left-0">
            <slot tag="div" name="title"></slot>
        </h1>


        <div class="border-top px-2">
            <slot tag="div" name="body"></slot>
        </div>

    </section>
</template>

<style scoped>
section {
    max-width: 960px;
    margin: 0 auto;
}
</style>