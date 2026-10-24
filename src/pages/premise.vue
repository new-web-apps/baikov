<template>
  <div class="block">
    <MapWrapper />
    <Start />
  </div>

  <div class="image-section" style="display: flex; justify-content: center; align-items: center; background: #d9d6cd;">
    <img src="/images/fon/1.jpeg" class="full-width-img faded-img z"
      :style="{ maxHeight: 'calc(100vh - var(--header-height))', width: 'auto', opacity: 0.5 }" />
  </div>
</template>

<script lang="ts" setup>
import MapWrapper from '@/components/MapWrapper.vue';
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