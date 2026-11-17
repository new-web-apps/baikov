<template>
  <div class="premise-page">
    <MapWrapper />
    <Start />
  </div>

  <div class="image-section bottom-section">
    <img src="/images/fon/1.jpeg" class="full-width-img faded-img"
      :style="{ maxHeight: 'calc(100vh - var(--header-height))', width: 'auto', opacity: 0.5 }" />
  </div>
</template>

<script lang="ts" setup>
import MapWrapper from '@/components/MapWrapper.vue';
import Start from '@/components/Start.vue';

</script>

<style scoped>
.premise-page {
  padding-top: var(--header-height);
  width: var(--main-width);
  margin-left: auto;
  margin-right: auto;
}

.image-section {
  width: 100%;
  flex-direction: column;
}

.bottom-section {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #d9d6cd;
}
</style>