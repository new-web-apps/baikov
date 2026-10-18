<template>
  <v-app>
    <v-app-bar  color="transparent" flat>
      <div class="d-flex align-center justify-center g-4 w-100">
        <v-btn variant="plain" to="/" exact selected-class="selected">{{mainTexts?.menuText?.pagePerson}}</v-btn>
        <v-btn variant="plain" to="/premise" selected-class="selected">{{mainTexts?.menuText?.pagePremise}}</v-btn>
        <v-btn variant="plain" to="/objects" selected-class="selected">{{mainTexts?.menuText?.pageObjects}}</v-btn>
        <v-btn variant="plain" to="/stat" selected-class="selected">{{mainTexts?.menuText?.pageStat}}</v-btn>
      </div>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/stores/app';
import { storeToRefs } from 'pinia';

const appStore = useAppStore();
const { getMainTexts: mainTexts } = storeToRefs(appStore);
</script>

<style scoped>
.v-selected--active {
  font-weight: bold;
}
</style>
