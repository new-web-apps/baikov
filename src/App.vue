<template>
  <v-app color="transparent">
    <!-- Шапка абсолютно независима, зафиксирована сверху, z-index приподнят -->
    <v-app-bar color="transparent" flat fixed class="main-header">
      <div class="d-flex align-center justify-center g-4 w-100">
        <v-btn variant="plain" to="/premise" selected-class="selected">
          {{ mainTexts?.menuText?.pagePremise }}
        </v-btn>
        <v-btn variant="plain" to="/tansformations" selected-class="selected">
          {{ mainTexts?.menuText?.pagetTansformations }}
        </v-btn>
        <v-btn variant="plain" to="/stat" selected-class="selected">
          {{ mainTexts?.menuText?.pageStat }}
        </v-btn>
        <v-btn variant="plain" to="/person" selected-class="selected">
          {{ mainTexts?.menuText?.pagePerson }}
        </v-btn>
        <v-btn variant="plain" to="/" exact selected-class="selected">
          {{ mainTexts?.menuText?.pageObjects }}
        </v-btn>
      </div>
    </v-app-bar>

    <!-- Зона контента занимает честные 100vh. Никакого дрожания и отступов -->
    <v-main class="scrollable-content" color="transparent">
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

<style>
/* Полностью отключаем дефолтный скролл окна */
html,
body {
  overflow: hidden !important;
  height: 100% !important;
  margin: 0;
  padding: 0;
  background: #dadad2;
}

/* Шапка парит над всем контентом, не влияя на его геометрию */
.main-header {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  z-index: 9999 !important;
  pointer-events: none;
  /* Пропускаем клики сквозь прозрачные области шапки */
}

/* Возвращаем кликабельность кнопкам внутри шапки */
.main-header .v-btn {
  pointer-events: auto;
}

/* Чистый контейнер на весь экран для страниц и GSAP */
.scrollable-content {
  height: 100vh !important;
  overflow-y: auto !important;
  overflow-x: hidden !important;
  position: relative;
  padding: 0 !important;
  /* Убираем все отступы, блоки заходят ПОД меню */
}

/* Стили для активных кнопок */
.v-selected--active {
  font-weight: bold;
}
</style>
