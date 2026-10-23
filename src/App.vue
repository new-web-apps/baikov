<template>
  <v-app color="transparent">
    <div :style="{ display: 'fixed', height: headerHeight }" class="main-header">
      <div class="header-container"
        :style="{ minWidth: mainWidth, maxWidth: mainWidth, display: 'flex', marginLeft: 'auto', marginRight: 'auto', alignItems: 'center' }">
        <v-img src="/images/header/1.png" alt="Логотип" :width="headerHeight" :height="headerHeight"
          style="margin: 2px;" />
        <div class="header-text text-secondary shadow">География дала Ростову шанс<br />Байков превратил этот шанс в
          судьбу
        </div>
        <div>
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
        <v-img src="/images/header/герб.png" alt="Логотип" :width="headerHeight - 25" :height="headerHeight - 25"
          style="margin: 3px;" />
      </div>
    </div>

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

const headerHeight = 200;
const mainWidth = 1280;
</script>

<style>
:root {
  --header-height: v-bind(headerHeight + 'px');
  --main-width: v-bind(mainWidth + 'px');
  --header-height: 200px;
  --main-width: 1280px;
}

/* Применяем ко всему тексту на сайте */
.shadow {
  text-shadow:
    0px 1px 2px rgba(255, 255, 255, 0.6),
    /* Плотная тень для четкости краев */
    0px 2px 8px rgba(255, 255, 255, 0.3);
  /* Мягкое размытие для объема */
}

.shadow-for-white-text {
  text-shadow:
    0px 1px 2px rgba(0, 0, 0, 0.8),
    /* Мягкая объемная тень для отделения от фона */
    0px 2px 6px rgba(0, 0, 0, 0.4);
}


/* Полностью отключаем дефолтный скролл окна */
html,
body {
  overflow: hidden !important;
  height: 100% !important;
  margin: 0;
  padding: 0;
  /* background: #dadad2; */
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

.header-container {
  width: var(--main-width);
  width: 1280px;
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

.header-text {
  font-size: 23px;
  font-weight: 600;
  min-width: 450px;
}

.faded-img {
  /* Магия линейного градиента маски: 
     - Слева (0%) картинка полностью прозрачна (transparent)
     - К 15% ширины она плавно становится 100% видимой (black)
     - До 85% ширины она остается четкой и сочной
     - От 85% до 100% (справа) она снова плавно растворяется в прозрачность
  */
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 15%),
    linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);
  mask-image:
    /* Размытие сверху (от прозрачного к черному) */
    linear-gradient(to bottom, transparent 0%, black 15%),
    /* Размытие слева и справа (ваш исходный градиент) */
    linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);

  /* ВАЖНО: чтобы маски не перекрывали, а дополняли друг друга, 
   нужно смешать их через режим multiply (умножение) */
  mask-composite: intersect;
  -webkit-mask-composite: destination-in;
  /* Для поддержки в Safari и старых Chrome */

}
</style>
