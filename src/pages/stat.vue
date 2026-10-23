<template>
  <div class="block">
    <Results />
  </div>

  <div class="image-section" style="display: flex; justify-content: center; align-items: center; background: #d9d6cd;">
    <img src="/images/fon/3.jpeg" class="full-width-img faded-img"
      :style="{ maxHeight: 'calc(100vh - var(--header-height))', width: 'auto', opacity: 0.5 }" />
  </div>
</template>

<script lang="ts" setup>
import Results from '@/components/Results.vue';

</script>

<style scoped>
.block {
  padding-top: var(--header-height);
  width: var(--main-width);
  margin-left: auto;
  margin-right: auto;
}
</style>