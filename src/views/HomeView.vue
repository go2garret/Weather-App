<script setup lang="ts">
import NextDays from '@/components/NextDays.vue';
import NextHours from '@/components/NextHours.vue';
</script>

<template>
  <main>

    <NextHours></NextHours>
    <NextDays></NextDays>

  </main>
</template>

<style lang="scss" scoped>
main {
  padding: 1.2rem;
  background-color: blue;
  background-image: linear-gradient(to bottom, #10588a 30%, #0ca7c6 60%, #e4ecf1 60%, #e4ecf1 100%);
  flex-grow: 1;
}
</style>