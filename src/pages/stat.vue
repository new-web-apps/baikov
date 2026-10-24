<template>
  <div class="block">
    <Results />
  </div>

  <!-- Контейнер-обертка служит триггером для фиксации -->
  <div ref="mapBlockRef" class="map-section-wrapper">
    <div class="map-slider-container">

      <!-- Нижележащая карта (Обычная) -->
      <img src="/images/results/3.png" class="map-image base" alt="Базовая карта" />

      <!-- Верхняя карта (Светящиеся дороги), которая режется по CSS-переменной -->
      <img ref="overlayImgRef" src="/images/results/4.png" class="map-image overlay" alt="Карта с дорогами" />

      <!-- Ваш SVG-слой с 6 дорогами -->
      <svg version="1.0" xmlns="http://w3.org" viewBox="0 0 1588 895" class="overlay-svg"
        preserveAspectRatio="xMidYMid meet">
        <g transform="translate(0.000000,895.000000) scale(0.100000,-0.100000)" fill="none" stroke="none">
          <!-- Код дорог и огоньков -->
        </g>
      </svg>

    </div>
  </div>

  <div class="image-section" style="display: flex; justify-content: center; align-items: center; background: #d9d6cd;">
    <img src="/images/fon/3.jpeg" class="full-width-img faded-img"
      :style="{ maxHeight: 'calc(100vh - var(--header-height))', width: 'auto', opacity: 0.5 }" />
  </div>
</template>

<script lang="ts" setup>
import Results from '@/components/Results.vue';
import { onMounted, onUnmounted, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const mapBlockRef = ref<HTMLDivElement | null>(null);
const overlayImgRef = ref<HTMLImageElement | null>(null);

onMounted(() => {
  if (mapBlockRef.value && overlayImgRef.value) {
    // 1. Создаем таймлайн, привязанный к ScrollTrigger всей секции
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mapBlockRef.value,
        scroller: '.scrollable-content',
        start: 'top top',    // Блок доезжает до верха экрана и фиксируется
        end: '+=1500',       // Длина общей фиксации на экране
        pin: true,           // Замораживаем страницу
        scrub: true,         // Жесткая связь анимации с колесиком мыши
        invalidateOnRefresh: true,
      }
    });

    // 2. Добавляем пустую паузу в начале таймлайна (например, на 10% от всего времени фиксации)
    // Это гарантирует, что блок сначала полностью встанет на место, и только потом начнется движение
    tl.to({}, { duration: 0.2 });

    // 3. Запускаем саму анимацию раскрытия шторки
    tl.to(overlayImgRef.value, {
      '--reveal': '100%',
      ease: 'none',
      duration: 1 // Относительная длительность шага внутри таймлайна
    });

    // 4. Добавляем небольшую паузу в конце (чтобы пользователь успел рассмотреть готовую карту)
    tl.to({}, { duration: 0.2 });
  }
});

onUnmounted(() => {
  ScrollTrigger.getAll().forEach((trigger: ScrollTrigger) => trigger.kill());
});
</script>

<style scoped>
.block {
  padding-top: var(--header-height);
  width: var(--main-width);
  margin-left: auto;
  margin-right: auto;
}

.map-section-wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d9d6cd;
}

.map-slider-container {
  position: relative;
  width: var(--main-width);
  max-width: 1588px;
  aspect-ratio: 1588 / 895;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.map-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: fill;
  pointer-events: none;
}

.map-image.overlay {
  --reveal: 0%;
  clip-path: polygon(0 0, var(--reveal) 0, var(--reveal) 100%, 0 100%);
  will-change: clip-path, transform;
}

.overlay-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
}
</style>
