<script setup lang="ts">
import { ref } from 'vue';


</script>

<template>
    <section class="py-2 bg-white mb-4 rounded-1">

        <h1 class="p-2 w-100">
            <slot tag="div" name="title"></slot>
        </h1>


        <div class="border-top px-2">
            <slot tag="div" name="body"></slot>
        </div>

    </section>
</template>
