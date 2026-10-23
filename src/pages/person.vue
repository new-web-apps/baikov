<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const blockOneRef = ref(null);
const textOneRef = ref(null);

const blockTwoRef = ref(null);
const textTwoRef = ref(null);

onMounted(() => {
  // АНИМАЦИЯ ДЛЯ ПЕРВОГО БЛОКА
  if (blockOneRef.value && textOneRef.value) {
    // Используем метод .to(), так как текст ИЗНАЧАЛЬНО стоит на месте сверху
    gsap.to(textOneRef.value, {
      y: () => window.innerHeight - 300,
      scrollTrigger: {
        trigger: blockOneRef.value,
        scroller: '.scrollable-content',
        start: 'top top',
        end: '+=1000', // Длина прокрутки анимации
        pin: true,     // Фон застывает, пока текст едет вниз
        scrub: 1,      // Текст четко следует за колесиком мыши
        invalidateOnRefresh: true,
      }
    });
  }

  // АНИМАЦИЯ ДЛЯ ВТОРОГО БЛОКА
  if (blockTwoRef.value && textTwoRef.value) {
    gsap.to(textTwoRef.value, {
      y: () => window.innerHeight - 300,
      scrollTrigger: {
        trigger: blockTwoRef.value,
        scroller: '.scrollable-content',
        start: 'top top',
        end: '+=1000',
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });
  }
});

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
});
</script>

<template>
  <div class="simple-scroll-page">

    <!-- БЛОК 1 -->
    <div ref="blockOneRef" class="scroll-section bg-first">
      <v-container class="fill-height align-start pt-16" color="transparent">
        <!-- align-start и pt-16 прижимают текст к верхней части экрана на старте -->
        <v-row>
          <v-col cols="12" md="5">

            <div ref="textOneRef" class="animated-text-box">
              <h2 class="text-h3 font-weight-black text-white mb-4 text-shadow">
                Первый Слайд
              </h2>
              <p class="text-h6 text-white text-shadow">
                Этот текст изначально виден наверху страницы. Когда вы начнете крутить колесико, он плавно поедет вниз и
                замрет у нижней границы экрана.
              </p>
            </div>

          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- БЛОК 2 -->
    <div ref="blockTwoRef" class="scroll-section bg-second">
      <v-container class="fill-height align-start pt-16">
        <v-row>
          <v-col cols="12" md="5">

            <div ref="textTwoRef" class="animated-text-box">
              <h2 class="text-h3 font-weight-black text-white mb-4 text-shadow">
                Второй Слайд
              </h2>
              <p class="text-h6 text-white text-shadow">
                Второй блок появляется из-под низа страницы. Его текст тоже сначала виден вверху экрана, а при скролле
                опускается в самый низ.
              </p>
            </div>

          </v-col>
        </v-row>
      </v-container>
    </div>


    <!-- БЛОК 2 -->
    <div class="scroll-section bg-bottom">
    </div>

  </div>
</template>

<style scoped>
.simple-scroll-page {
  width: 100%;
}

.scroll-section {
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: center;
  position: relative;
}

.bg-first {
  /* background-image: url('/images/start/1.png'); */
}

.bg-second {
  background-image: url('/images/start/2.png');
}

.bg-bottom {
  background-image: url('/images/fon/1_fix.png');
}

.animated-text-box {
  will-change: transform;
}

.text-shadow {
  text-shadow: 0px 4px 15px rgba(0, 0, 0, 0.85);
}
</style>
