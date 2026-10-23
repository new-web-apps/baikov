<template>
  <v-card :title="itemKey" :text="item?.text" class="interactive-card" />
</template>

<script setup lang="ts">
interface ItemType {
  text: string;
  pictures: string[];
}

defineProps<{
  itemKey: string | number;
  item?: ItemType;
}>();
</script>

<style scoped>
/* Начальное состояние карточки */
.interactive-card {
  background: #1e1e2f;
  /* Дефолтный темный фон */
  transition: background 0.4s ease, transform 0.3s ease;
  /* Плавный переход для фона и размера */
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Состояние при НАВЕДЕНИИ (Hover) */
.interactive-card:hover {
  /* 1. Меням фон на градиент или любой другой цвет */
  background: linear-gradient(135deg, #2b1055, #7597de);

  /* 2. Увеличиваем карточку на 5% (scale) */
  transform: scale(1.05);

  /* 3. Запускаем бесконечную тряску, которая длится 0.3 секунды */
  animation: gentle-shake 0.3s ease-in-out infinite;
}

/* Описываем микро-тряску (покачивание влево-вправо на 1 градус) */
@keyframes gentle-shake {

  0%,
  100% {
    transform: scale(1.05) rotate(0deg);
  }

  25% {
    transform: scale(1.05) rotate(-1deg);
  }

  75% {
    transform: scale(1.05) rotate(1deg);
  }
}
</style>
