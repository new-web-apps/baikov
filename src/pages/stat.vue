<template>
  <div class="block">
    <Results />
  </div>

  <!-- Карта-секция: серый фон, карта внутри, GSAP pins эту секцию -->
  <div ref="mapBlockRef" class="map-section-wrapper">
    <div class="map-slider-container">

      <!-- Нижележащая карта -->
      <img src="/images/results/3.png" class="map-image base" alt="Базовая карта" />

      <!-- Верхняя карта, раскрывающаяся маской -->
      <img ref="overlayImgRef" src="/images/results/4.png" class="map-image overlay" alt="Карта с дорогами" />

      <!-- SVG-слой с дорогами -->
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
  ScrollTrigger.refresh();
  ScrollTrigger.getAll().forEach(t => t.kill());

  if (!mapBlockRef.value || !overlayImgRef.value) return;

  const wrapper = mapBlockRef.value;
  const wrapperHeight = wrapper.offsetHeight;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: wrapper,
      scroller: '.scrollable-content',
      start: 'top top',            // Карта сразу после шапки — фиксируется
      end: `+=${wrapperHeight + 800}`, // Фиксация + прокрутка + пауза в конце
      pin: true,
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  // Фаза 1: пауза — карта зафиксирована, раскрытие ещё не началось
  tl.to({}, { duration: 0.15 });

  // Фаза 2: раскрытие маски слева направо
  tl.to(overlayImgRef.value, {
    '--reveal': '100%',
    ease: 'none',
    duration: 1
  });

  // Фаза 3: пауза — карта полностью раскрыта, можно рассматривать
  tl.to({}, { duration: 0.15 });
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

/* Серый фон — на всей секции */
.map-section-wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d9d6cd;
}

/* Контейнер карты */
.map-slider-container {
  position: relative;
  width: var(--main-width);
  max-width: 1588px;
  aspect-ratio: 1588 / 895;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

/* Оба изображения — покрывают весь контейнер */
.map-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: fill;
  pointer-events: none;
  background-color: #d9d6cd; /* fallback — серый всегда за картиной */
}

/* Маска раскрытия */
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