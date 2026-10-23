<template>
  <div class="block">
    <Start />
    <div v-for="key in [1, 2, 3, 4, 5]">
      <v-img :width="255" aspect-ratio="4/3" cover :src="`images/start/${key}`"></v-img>
    </div>
  </div>

  <div class="image-section" style="display: flex; justify-content: center; align-items: center; background: #d9d6cd;">
    <img src="/images/fon/1.jpeg" class="full-width-img faded-img"
      :style="{ maxHeight: 'calc(100vh - var(--header-height))', width: 'auto', opacity: 0.5 }" />
  </div>
</template>

<script lang="ts" setup>
import Start from '@/components/Start.vue';

</script>

<style scoped>
.block {
  padding-top: var(--header-height);
  width: var(--main-width);
  margin-left: auto;
  margin-right: auto;
}

.image-section {
  width: 100%;
  flex-direction: column;
}
</style>