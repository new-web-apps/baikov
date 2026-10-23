<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sceneRef = ref<HTMLElement | null>(null)

const cycleItems = ref([
  {
    id: 1,
    title: 'Торговые льготы и инфраструктура',
    desc: 'Ещё до вступления в должность, в 1861–1862 годах, Байков активно лоббировал открытие конторы Государственного банка и расширение прав таможни. Став главой города в 1862 году, он учредил Биржевой комитет для юридической прозрачности сделок и Общество взаимного кредита, открыв купцам доступ к недорогим оборотным деньгам',
    bg: 'images/start/1.png'
  },
  {
    id: 2,
    title: 'Рост купеческих оборотов',
    desc: 'Получив надёжные финансовые институты и гарантии, на Дон потянулись крупные инвесторы. Снятие административных барьеров привело к лавинообразному росту объёмов внутренней и экспортной торговли',
    bg: 'https://picsum.photos'
  },
  {
    id: 3,
    title: 'Огромные налоговые поступления в казну',
    desc: 'Рост оборотов позволил Байкову наполнить пустой и закредитованный бюджет города. Главной победой стало лоббирование компенсации за отменённый 10%-й сбор с отпускных пошлин, что только за 1864–1869 годы принесло казне колоссальные 76 654 рубля. Дополнительными доходными статьями стали упорядоченные сборы с обновлённой речной пристани, антрацитных складов и аренды городских площадей',
    bg: 'https://picsum.photos'
  },
  {
    id: 4,
    title: 'Инвестиции в медицину, фонари и образование',
    desc: 'Полученный от торговли капитал Байков незамедлительно инвестировал в безопасность и социальную сферу. В 1864 году на улицах зажглись первые 600 фотогеновых фонарей, защитившие имущество торговцев от грабежей, в 1865 году заработал первый паровой водопровод протяжённостью 5 километров, а в 1869 году открылась женская прогиманзия. Вернувшись на пост в свой второй период правления, он дополнил городскую сеть Санитарной службой (1874), телефонной связью (1886), конно-железной дорогой (1887) и Публичной библиотекой (1886)',
    bg: 'https://picsum.photos'
  },
  {
    id: 5,
    title: 'Дальнейшее снижение издержек бизнеса',
    desc: 'В результате Ростов получил решающее конкурентное преимущество перед соседними Таганрогом и Азовом. Освещённые улицы минимизировали убытки от ночных краж на складах, водопровод и санитарный контроль застраховали город от закрытия порта на карантин во время южных эпидемий, а новые учебные заведения воспитали квалифицированные кадры — грамотных счетоводов, приказчиков и инженеров',
    bg: 'https://picsum.photos'
  }
])

onMounted(() => {
  if (!sceneRef.value) return

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sceneRef.value,
      scroller: '.scrollable-content',
      start: 'top top',
      end: '+=2500',
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true
    }
  })

  cycleItems.value.forEach((_, index) => {
    tl.fromTo(`.card-node-${index}`,
      { opacity: 0, scale: 0.6 },
      { opacity: 1, scale: 1, duration: 1, ease: 'power1.out' }
    )

    if (index < cycleItems.value.length - 1) {
      tl.fromTo(`.arrow-node-${index}`,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'none' },
        '-=0.3'
      )
    }
  })
})

// ХОВЕР МЕТОДЫ: Безопасно управляем увеличением через GSAP, сохраняя орбиту
const onCardHover = (e: MouseEvent, index: number) => {
  const card = e.currentTarget as HTMLElement
  const angle = (360 / cycleItems.value.length) * index

  gsap.to(card, {
    // Дублируем круговые координаты трансформации и безопасно добавляем scale(1.08)
    transform: `rotate(${angle}deg) translate(0, -260px) rotate(-${angle}deg) scale(1.08)`,
    borderColor: '#58a6ff',
    boxShadow: '0 8px 24px rgba(88, 166, 255, 0.15)',
    zIndex: 20,
    duration: 0.3,
    ease: 'power1.out',
    overwrite: 'auto'
  })
}

const onCardLeave = (e: MouseEvent, index: number) => {
  const card = e.currentTarget as HTMLElement
  const angle = (360 / cycleItems.value.length) * index

  gsap.to(card, {
    // Возвращаем дефолтные круговые координаты без scale
    transform: `rotate(${angle}deg) translate(0, -260px) rotate(-${angle}deg) scale(1)`,
    borderColor: '#e0e0e0',
    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
    zIndex: 10,
    duration: 0.3,
    ease: 'power1.out',
    overwrite: 'auto'
  })
}

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
})
</script>

<template>
  <div ref="sceneRef" class="circle-scene">

    <div class="center-core text-center">
      <h2 class="text-h5 font-weight-black mb-1">МАХОВИК БАЙКОВА</h2>
      <div class="text-caption text-grey">Экономический цикл</div>
    </div>

    <div class="wheel-container">

      <!-- КАРТОЧКИ: Обрабатываем наведение через JS функции -->
      <div v-for="(item, index) in cycleItems" :key="item.id" :class="['minimal-card', `card-node-${index}`]" :style="{
        transform: `rotate(${(360 / cycleItems.length) * index}deg) translate(0, -260px) rotate(-${(360 / cycleItems.length) * index}deg)`,
        '--bg-img': `url(${item.bg})`
      }" @mouseenter="onCardHover($event, index)" @mouseleave="onCardLeave($event, index)">
        <div class="card-content">
          <h4 class="text-subtitle-1 font-weight-bold mb-1 text-primary">{{ item.title }}</h4>
          <p class="text-caption text-grey-darken-3 mb-0 leading-tight">{{ item.desc }}</p>
        </div>
      </div>

      <!-- СТРЕЛКИ -->
      <div v-for="(item, index) in cycleItems" :key="'arrow-' + item.id" v-show="index < cycleItems.length - 1"
        :class="['loop-arrow-wrapper', `arrow-node-${index}`]"
        :style="{ transform: `rotate(${(360 / cycleItems.length) * index + 36}deg)` }">
        <svg class="curved-arrow" viewBox="0 0 100 100" xmlns="http://w3.org">
          <path d="M 50,10 A 40,40 0 0,1 85,35" fill="none" stroke="#9e9e9e" stroke-width="2" stroke-dasharray="4 4" />
          <polygon points="85,35 77,33 82,26" fill="#9e9e9e" />
        </svg>
      </div>

    </div>

  </div>
</template>

<style scoped>
.circle-scene {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: #ffffff;
}

.center-core {
  position: absolute;
  z-index: 5;
  pointer-events: none;
}

.wheel-container {
  position: relative;
  width: 600px;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.minimal-card {
  position: absolute;
  width: 15wh;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  padding: 14px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  opacity: 0;
  z-index: 10;
  overflow: hidden;
}

/* Навешиваем плавность появления только на псевдоэлемент картинки */
.minimal-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: var(--bg-img);
  background-size: cover;
  background-position: center;
  opacity: 0;
  z-index: 1;
  transition: opacity 0.3s ease;
}

.card-content {
  position: relative;
  z-index: 2;
}

/* Из CSS убрали свойство transform: scale, чтобы оно не сбрасывало орбиту */
.minimal-card:hover::before {
  opacity: 0.12;
}

.loop-arrow-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
}

.curved-arrow {
  position: absolute;
  width: 620px;
  height: 620px;
}
</style>
