<template>1
  <Start />
  <div v-for="key in [1, 2, 3, 4, 5]">
    <v-img :width="255" aspect-ratio="4/3" cover :src="`images/start/${key}`"></v-img>
  </div>
</template>

<script lang="ts" setup>
import Start from '@/components/Start.vue';

</script>