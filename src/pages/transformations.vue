<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sceneRef = ref<HTMLElement | null>(null)

const cycleItems = ref([
  {
    id: 1,
    title: 'Торговые льготы и инфраструктура >',
    desc: 'Ещё до вступления в должность, в 1861–1862 годах, Байков активно лоббировал открытие конторы Государственного банка и расширение прав таможни. Став главой города в 1862 году, он учредил Биржевой комитет для юридической прозрачности сделок и Общество взаимного кредита, открыв купцам доступ к недорогим оборотным деньгам.',
    pictures: ['images/transformations/1.jpg', 'images/transformations/1_.jpeg']
  },
  {
    id: 2,
    title: 'Рост купеческих оборотов >',
    desc: 'Получив надёжные финансовые институты и гарантии, на Дон потянулись крупные инвесторы. Снятие административных барьеров привело к лавинообразному росту объёмов внутренней и экспортной торговли.',
    pictures: ['images/transformations/2.jpg', 'images/transformations/2_.png']
  },
  {
    id: 3,
    title: 'Огромные налоговые поступления в казну  >',
    desc: 'Рост оборотов позволил Байкову наполнить пустой и закредитованный budget города. Главной победой стало лоббирование компенсации за отменённый 10%-й сбор с отпускных пошлин, что только за 1864–1869 годы принесло казне колоссальные 76 654 рубля. Дополнительными доходными статьями стали упорядоченные сборы с обновлённой речной пристани, антрацитных складов и аренды городских площадей.',
    pictures: ['images/transformations/3.png', 'images/transformations/3_.webp']
  },
  {
    id: 4,
    title: 'Инвестиции в медицину, фонари и образование  >',
    desc: 'Полученный от торговли капитал Байков незамедлительно инвестировал в безопасность и социальную сферу. В 1864 году на улицах зажглись первые 600 фотогеновых фонарей, защитившие имущество торговцев от грабежей, в 1865 году заработал первый паровой водопровод протяжённостью 5 километров, а в 1869 году открылась женская прогиманзия. Вернувшись на пост в свой второй период правления, он дополнил городскую сеть Санитарной службой (1874), телефонной связью (1886), конно-железной дорогой (1887) и Публичной библиотекой (1886).',
    pictures: ['images/transformations/4_.webp', 'images/transformations/4__.jpg']
  },
  {
    id: 5,
    title: 'Дальнейшее снижение издержек бизнеса  >',
    desc: 'В результате Ростов получил решающее конкурентное преимущество перед соседними Таганрогом и Азовом. Освещённые улицы минимизировали убытки от ночных краж на складах, водопровод и санитарный контроль застраховали город от закрытия порта на карантин во время южных эпидемий, а новые учебные заведения воспитали квалифицированные кадры — грамотных счетоводов, приказчиков и инженеров.',
    pictures: ['images/transformations/5.jpg', 'images/transformations/5_.jpg']
  },
  {
    id: 6, pictures: []
  }
])

onMounted(() => {
  if (!sceneRef.value) return

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sceneRef.value,
      scroller: '.scrollable-content',
      start: 'top top',
      end: 'bottom bottom', // Синхронизировано с длиной контента картинок
      scrub: 1
    }
  })

  cycleItems.value.forEach((_, index) => {
    if (index === 0) return

    const label = `step-${index}`

    // 1. АНИМАЦИЯ ОПИСАНИЙ: Предыдущий текст просто бесследно пропадает (без улетаний)
    tl.to(`.desc-node-${index - 1}`, {
      opacity: 0,
      duration: 0.2,
      ease: 'power1.in'
    }, label)

    // 2. АНИМАЦИЯ ЗАГОЛОВКОВ: Отработанный заголовок срывается с центра и улетает влево-вверх,
    // формируя список с шагом по высоте (index - 1) * 60px
    tl.to(`.title-node-${index - 1}`, {
      // xPercent: -85,              // Уносим к левому краю экрана
      // yPercent: 140,             // Поднимаем наверх из центральной зоны
      y: 300 + (index - 1) * 60,        // Накапливаем вертикальный список друг под другом
      scale: 0.4,                 // Уменьшаем шрифт для аккуратного оглавления
      // opacity: 0.6,               // Прошлые пункты списка делаем чуть приглушенными
      textAlign: 'left',
      duration: 1.2,
      ease: 'power2.inOut'
    }, label)

    // 3. ПОЯВЛЕНИЕ НОВОГО БЛОКА: Новый заголовок и текст встают в центр крупно
    // Заголовок может накладываться "внахлест" поверх старого, пока тот улетает
    tl.fromTo(`.title-node-${index}`,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power2.out' },
      `${label}+=0.2`             // Микрозадержка для эффекта нахлеста
    )

    tl.fromTo(`.desc-node-${index}`,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power2.out' },
      `${label}+=0.2`
    )
  })
})

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(t => t.kill())
})
</script>

<template>
  <div ref="sceneRef" class="scroll-scene">

    <!-- ЛЕНТА КАРТИНОК -->
    <div v-for="item in cycleItems" :key="'group-' + item.id" class="image-section"
      style="display: flex; justify-content: center; align-items: center;">
      <img v-for="picture in item.pictures" :key="picture" :src="picture" class="full-width-img"
        :style="{ width: '100%', opacity: 0.8 }" />
    </div>
    <div class="image-section"
      style="display: flex; justify-content: center; align-items: center; background: #d9d6cd;">
      <img src="/images/fon/2.jpeg" class="full-width-img faded-img"
        :style="{ maxHeight: 'calc(100vh - var(--header-height))', width: 'auto', opacity: 0.5 }" />
    </div>

    <!-- ФИКСИРОВАННЫЙ ИНТЕРФЕЙС ПОВЕРХ КАРТИНОК -->
    <div class="fixed-ui-layer" style="width: min(var(--main-width), 100%); margin-left: auto; margin-right: auto;">
      <div class="fill-height">

        <!-- ЦЕНТРАЛЬНАЯ СЦЕНА ЗАГОЛОВКОВ (Изначально стоят крупно строго по центру) -->
        <div class="center-title-stage">
          <h2 v-for="(item, index) in cycleItems" :key="'title-' + item.id"
            :class="['text-h2 font-weight-black text-blackText shadow main-title-block', `title-node-${index}`]"
            :style="{ opacity: index === 0 ? 1 : 0 }">
            {{ item.title }}
          </h2>
        </div>

        <!-- ЦЕНТРАЛЬНАЯ СЦЕНА ОПИСАНИЙ (Просто чистый крупный текст под заголовком, без плашек) -->
        <div class="center-desc-stage mt-8">
          <div v-for="(item, index) in cycleItems" :key="'desc-' + item.id"
            :class="['pure-center-desc', `desc-node-${index}`, 'shadow-for-white-text']"
            :style="{ opacity: index === 0 ? 1 : 0 }">
            <p class="text-h5 text-white font-weight-medium leading-relaxed text-center">{{ item.desc }}</p>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<style scoped>
.scroll-scene {
  padding-top: var(--header-height);
  position: relative;
  width: 100%;
}

.image-section {
  width: 100%;
  flex-direction: column;
}

.full-width-img {
  width: 100%;
  display: block;
  height: auto;
}

/* Фиксированный слой интерфейса */
.fixed-ui-layer {
  padding-top: var(--header-height);
  position: fixed;
  top: 0;
  left: calc((100% - min(var(--main-width), 100%)) / 2);
  width: min(var(--main-width), 100%);
  height: 100vh;
  z-index: 10;
  pointer-events: none;
}

/* 
  ГЕОМЕТРИЯ СЦЕНЫ:
  Оба контейнера выровнены во флекс-контейнере по центру.
  Благодаря абсолютной позиции внутри сцены элементы накладываются внахлест.
*/
.center-title-stage {
  position: relative;
  width: 100%;
  max-width: 900px;
  height: 160px;
  /* Высота под крупные заголовки текста text-h2 */
  display: flex;
  align-items: center;
  justify-content: start;
}

.main-title-block {
  position: absolute;
  text-align: left;
  /* width: 100%; */
  width: 500px;
  width: max(var(--main-width), 500px);
  max-width: max(var(--main-width), 500px);
  transform-origin: left center;
  /* Важно для ухода к левому краю */
  /* text-shadow: 0 4px 15px rgba(0, 0, 0, 0.95); */
  line-height: 1.2 !important;
  font-size: 52px;
}

.center-desc-stage {
  position: relative;
  width: min(var(--main-width), 100%);
  max-width: min(var(--main-width), 100%);
  height: 250px;
  font-size: 20px;
}

/* Чистый текст без плашек, рамок и фонов */
.pure-center-desc {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  /* text-shadow: 0 2px 12px rgba(0, 0, 0, 0.95); */
}
</style>
