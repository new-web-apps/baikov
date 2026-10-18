<template>
  <v-app>
    <v-main>
      <v-app-bar  color="transparent" flat>
        <div class="d-flex align-center justify-center g-4 w-100">
          <v-btn variant="plain" to="/">{{mainTexts?.menuText?.pagePerson}}</v-btn>
          <v-btn variant="plain" to="/premise">{{mainTexts?.menuText?.pagePremise}}</v-btn>
          <v-btn variant="plain" to="/objects">{{mainTexts?.menuText?.pageObjects}}</v-btn>
          <v-btn variant="plain" to="/stat">{{mainTexts?.menuText?.pageStat}}</v-btn>
        </div>
      </v-app-bar>
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
