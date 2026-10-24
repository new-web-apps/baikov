<template>
  <div class="objects-container">
    <div style="display: flex; flex-direction: column; justify-content: flex-end;">
      <h1 class="title">{{ currentObject?.title }}</h1>
      <!-- Исправлено на display: grid -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px;">

        <!-- Левая колонка -->
        <div class="objects-list-column">
          <v-list v-model:selected="selectedObject" mandatory :items="objectList" color="primary"></v-list>
        </div>

        <!-- Правая колонка -->
        <div class="text-info-column">
          <div class="description">{{ currentObject?.text }}</div>
        </div>

      </div>
    </div>


    <!-- КОЛОНКА 3 (СПРАВА): Галерея и медиа -->
    <div class="media-column">
      <!-- Основная большая картинка -->
      <div class="picture image-wrapper">
        <img :src="selectedPicture" alt="Главное фото" />
      </div>

      <!-- Лента превью (миниатюры) -->
      <div class="photos-list">
        <v-slide-group v-model="selectedPicture" mandatory show-arrows>
          <v-slide-group-item v-for="photo in currentObject?.photos" :key="photo" :value="photo"
            v-slot="{ isSelected, toggle }">
            <v-card :class="['ma-1', isSelected ? 'active-thumb' : 'inactive-thumb']" height="70" width="70" flat
              @click="toggle">
              <v-img :src="photo" cover height="100%"></v-img>
            </v-card>
          </v-slide-group-item>
        </v-slide-group>
      </div>
    </div>

  </div>
  <div class="image-section" style="display: flex; justify-content: center; align-items: center; background: #d9d6cd;">
    <img src="/images/fon/2.jpeg" class="full-width-img faded-img z"
      :style="{ maxHeight: 'calc(100vh - var(--header-height))', width: 'auto', opacity: 0.5 }" />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useObjectsStore } from '@/stores/objects'
import { storeToRefs } from 'pinia'

const objectaStore = useObjectsStore()

const { getObjects: objects, objectsNames } = storeToRefs(objectaStore)

const objectList = computed(() => {
  return objectsNames.value.map(name => {
    return { value: name, title: objects.value[name]?.title }
  })
});

const selectedObject = ref([objectList.value[0].value])

const currentObject = computed(() => {
  const selectedKey = selectedObject.value[0]
  return objects.value[selectedKey] || null
})

const photosList = computed(() => {
  return currentObject.value.photos.map(name => {
    return { value: name, title: objects.value[name]?.title }
  })
});

const selectedPicture = ref(currentObject.value.photos?.[0] || '')

watch(selectedObject, () => {
  if (photosList.value.length > 0) {
    const firstItemValue = photosList.value[0].value

    selectedPicture.value = firstItemValue
  } else {
    selectedPicture.value = ''
  }
})
</script>

<style scoped>
/* Глобальный трехколоночный Grid на всю высоту экрана */
.objects-container {
  margin-top: var(--header-height);
  padding-bottom: 40px;
  display: grid;
  /* 3 колонки: Меню (280px), Текст (занимает 45% от остатка), Картинка (занимает 55%) */
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  /* padding: 24px; */

  /* Исключаем вертикальный скролл страницы: фиксируем высоту контейнера */
  height: calc(100vh - var(--header-height));
  /* 64px — примерная высота вашего v-app-bar, если он есть */
  max-height: calc(100vh - var(--header-height));
  overflow: hidden;
  /* Запрещаем скролл самого экрана */
  box-sizing: border-box;
  width: var(--main-width);
  max-width: var(--main-width);
  margin-left: auto;
  margin-right: auto;
}

/* КОЛОНКА 1: Список объектов */
.objects-list-column {
  background: #ffffff;
  height: 100%;
  overflow-y: auto;
  display: flex;
  align-items: end;
}

/* КОЛОНКА 2: Текст и заголовок (по центру) */
.text-info-column {
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
  overflow: hidden;
  /* Родитель не скроллится */
  align-items: end;
  justify-content: flex-end;
  height: 100%;
}

.title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.2;
  flex-shrink: 0;
  /* Заголовок не должен сжиматься */
  height: 100px;
  padding-left: 20px;
}

/* Описание скроллится отдельно, если текст очень длинный */
.description {
  font-size: 1.05rem;
  line-height: 1.6;
  color: #4a4a4a;
  white-space: pre-line;
  overflow-y: auto;
  /* Внутренний скролл ТОЛЬКО для текста */
  padding-right: 8px;
  height: 100%;
  height: 200px;
}

/* КОЛОНКА 3: Большое фото и превью (справа) */
.media-column {
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
  overflow: hidden;
}

/* Главное изображение адаптивно подстраивается под высоту экрана */
.image-wrapper {
  width: 100%;
  flex-grow: 1;
  /* Картинка забирает всё свободное место по высоте */
  min-height: 0;
  /* Важно для корректной работы flex-grow во вложенных элементах */
  /* border-radius: 12px; */
  overflow: hidden;
  background-color: #f5f5f5;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin: 0;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Горизонтальный блок миниатюр */
.photos-list {
  width: 100%;
  flex-shrink: 0;
  /* Панель превью не сжимается по высоте */
}

/* Стили превью-карточек */
.active-thumb {
  border: 3px solid #1867c0 !important;
  transform: scale(0.95);
  transition: all 0.2s ease;
}

.inactive-thumb {
  opacity: 0.6;
  transition: all 0.2s ease;
}

.inactive-thumb:hover {
  opacity: 1;
}

/* Кастомизация внутренних скроллбаров, чтобы они выглядели аккуратно */
.objects-list-column::-webkit-scrollbar,
.description::-webkit-scrollbar {
  width: 6px;
}

.objects-list-column::-webkit-scrollbar-thumb,
.description::-webkit-scrollbar-thumb {
  background-color: #dcdcdc;
  border-radius: 4px;
}

/* Адаптивность для небольших экранов (планшеты/моб) */
@media (max-width: 1024px) {
  .objects-container {
    grid-template-columns: 1fr;
    /* Перестраиваем в одну колонку */
    height: auto;
    max-height: none;
    overflow: auto;
    /* На мобильных скролл страницы возвращается */
  }

  .objects-list-column,
  .description {
    overflow-y: visible;
    height: auto;
  }

  .image-wrapper {
    height: 300px;
  }
}


/* Делаем колонки флекс-контейнерами и выравниваем их содержимое по нижнему краю */
.objects-list-column,
.text-info-column {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  /* Прижимает контент (v-list и описание) к самому низу */
  height: 100%;
  /* Растягивает колонки на всю доступную высоту сетки */
}

/* Если Vuetify-список имеет внутренние отступы, которые мешают ровному выравниванию */
.objects-list-column .v-list {
  margin-bottom: 0;
}
</style>
