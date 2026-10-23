<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const items: Record<string, string> = {
  'Блестящий ученик': 'Окончил престижное Императорское училище правоведения первым в выпуске и с золотой медалью. За выдающиеся успехи его имя было выбито на мраморной доске в Конференц-зале училища.',
  'Отважный боец': 'В начале Крымской войны командовал дружиной государственного ополчения. 1 июня 1854 года принял бой против англо-французского флота на острове Равенсари в Финском заливе, где получил боевое ранение. После этого отправился на лечение на юг России, где навсегда связал свою жизнь с Ростовом.',
  'Кавалер орденов': 'За мужество и доблесть, проявленные в бою, награждён орденом Святой Анны III степени и Крестом Государственного ополчения. За многолетнюю государственную службу удостоен чина действительного статского советника',
  'Надёжный семьянин': 'Незадолго до переезда на Дон женился на дочери генерал- майора Прасковье Яковлевне Колодкиной.Супруга полностью разделяла идеи Байкова и поддерживала все сложные начинания мужа, пока в семье подросла их единственная дочь Ольга',
  'Честный прагматик': 'Ворочая миллионными городскими бюджетами и создавая мощные финансовые институты для Юга России, Байков не запускал руку в казну Ростова. Основной капитал его семья заработала во время его работы контрагентом Кавказских Минеральных Вод',
}
const titles: string[] = Object.keys(items);
const descriptions: string[] = titles.map(key => items[key]);

gsap.registerPlugin(ScrollTrigger);

// Явно указываем типы для Vue refs (HTMLDivElement или null)
const blockOneRef = ref<HTMLDivElement | null>(null);
const textOneRef = ref<HTMLDivElement | null>(null);
const blockTwoRef = ref<HTMLDivElement | null>(null);
const textTwoRef = ref<HTMLDivElement | null>(null);
const blockThreeRef = ref<HTMLDivElement | null>(null);
const textThreeRef = ref<HTMLDivElement | null>(null);
const blockFourRef = ref<HTMLDivElement | null>(null);
const textFourRef = ref<HTMLDivElement | null>(null);
const blockFiveRef = ref<HTMLDivElement | null>(null);
const textFiveRef = ref<HTMLDivElement | null>(null);

onMounted(() => {

  if (blockOneRef.value && textOneRef.value) {
    gsap.to(textOneRef.value, {
      y: (): number => window.innerHeight - 300,
      scrollTrigger: {
        trigger: blockOneRef.value,
        scroller: '.scrollable-content',
        start: 'top top',
        end: '+=1000',
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });
  }
  if (blockTwoRef.value && textTwoRef.value) {
    gsap.to(textTwoRef.value, {
      y: (): number => window.innerHeight - 300,
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

  if (blockThreeRef.value && textThreeRef.value) {
    gsap.to(textThreeRef.value, {
      y: (): number => window.innerHeight - 300,
      scrollTrigger: {
        trigger: blockThreeRef.value,
        scroller: '.scrollable-content',
        start: 'top top',
        end: '+=1000',
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });
  }

  if (blockFourRef.value && textFourRef.value) {
    gsap.to(textFourRef.value, {
      y: (): number => window.innerHeight - 300,
      scrollTrigger: {
        trigger: blockFourRef.value,
        scroller: '.scrollable-content',
        start: 'top top',
        end: '+=1000',
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });
  }

  // if (blockFiveRef.value && textFiveRef.value) {
  //   gsap.to(textFiveRef.value, {
  //     y: (): number => window.innerHeight - 300,
  //     scrollTrigger: {
  //       trigger: blockFiveRef.value,
  //       scroller: '.scrollable-content',
  //       start: 'top top',
  //       end: '+=1000',
  //       pin: true,
  //       scrub: 1,
  //       invalidateOnRefresh: true,
  //     }
  //   });
  // }

});

onUnmounted(() => {
  // Типизируем trigger как ScrollTrigger, чтобы избежать implicit any в цикле
  ScrollTrigger.getAll().forEach((trigger: ScrollTrigger) => trigger.kill());
});
</script>


<template>
  <div class="simple-scroll-page">

    <div ref="blockOneRef" class="scroll-section bg-first">
      <v-container class="fill-height align-start pt-16" color="transparent">
        <v-row>
          <v-col cols="12" md="12">
            <div ref="textOneRef" class="animated-text-box">
              <h2 class="text-h3 font-weight-black text-white mb-4 text-shadow">
                {{ titles[0] }}
              </h2>
              <p class="text-h6 text-white text-shadow">
                {{ descriptions[0] }}
              </p>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <div ref="blockTwoRef" class="scroll-section bg-second">
      <v-container class="fill-height align-start pt-16">
        <v-row>
          <v-col cols="12" md="12">
            <div ref="textTwoRef" class="animated-text-box">
              <h2 class="text-h3 font-weight-black text-white mb-4 text-shadow">
                {{ titles[1] }}
              </h2>
              <p class="text-h6 text-white text-shadow">
                {{ descriptions[1] }}
              </p>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <div ref="blockThreeRef" class="scroll-section bg-third">
      <v-container class="fill-height align-start pt-16">
        <v-row>
          <v-col cols="12" md="12">
            <div ref="textThreeRef" class="animated-text-box">
              <h2 class="text-h3 font-weight-black text-white mb-4 text-shadow">
                {{ titles[2] }}
              </h2>
              <p class="text-h6 text-white text-shadow">
                {{ descriptions[2] }}
              </p>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <div ref="blockFourRef" class="scroll-section bg-fourth">
      <v-container class="fill-height align-start pt-16">
        <v-row>
          <v-col cols="12" md="12">
            <div ref="textFourRef" class="animated-text-box">
              <h2 class="text-h3 font-weight-black text-white mb-4 text-shadow">
                {{ titles[3] }}
              </h2>
              <p class="text-h6 text-white text-shadow">
                {{ descriptions[3] }}
              </p>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <div ref="blockFiveRef" class="scroll-section bg-fiveth" style="position: relative; background: #d9d6cd;">
      <v-container class="fill-height align-start pt-16">
        <v-row>
          <v-col cols="12" md="12">
            <div ref="textFiveRef" class="animated-text-box">
              <h2 class="text-h3 font-weight-black text-white mb-4 text-shadow">
                {{ titles[4] }}
              </h2>
              <p class="text-h6 text-white text-shadow">
                {{ descriptions[4] }}
              </p>
            </div>
          </v-col>
        </v-row>
      </v-container>
      <div class="image-section" style="
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          bottom: 0;
          left: 50%;
          right: 50%;
        ">
        <img src=" /images/fon/1.jpeg" class="full-width-img faded-img"
          :style="{ maxHeight: 'calc(100vh - var(--header-height))', width: 'auto', opacity: 0.5 }" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.simple-scroll-page {
  width: 100%;
  padding-top: var(--header-height);
}

.scroll-section {
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: center;
  position: relative;
}

.bg-first {
  background-image: url('/images/person/5.jpg');
}

.bg-second {
  background-image: url('/images/person/3.jpg');
}

.bg-third {
  background-image: url('/images/person/6.jpg');
}

.bg-fourth {
  background-image: url('/images/person/7.jpg');
}

.bg-fives {
  background-image: url('/images/person/1.jpg');
}

.animated-text-box {
  will-change: transform;
}

.text-shadow {
  text-shadow: 0px 4px 15px rgba(0, 0, 0, 0.85);
}

h2 {
  font-size: 35px;
}

p {
  font-size: 25px;
}
</style>
