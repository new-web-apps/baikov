<template>
  <QuoteAboutBaikov />
  <PersonalCharacteristics />
  <div v-for="key in [1, 2, 3, 4, 5, 6, 7]">
    <v-img :width="255" aspect-ratio="4/3" cover :src="`images/person/${key}.jpg`"></v-img>
  </div>
</template>

<script lang="ts" setup>
import QuoteAboutBaikov from '../components/QuoteAboutBaikov.vue';
import PersonalCharacteristics from '../components/PersonalCharacteristics.vue';
</script>