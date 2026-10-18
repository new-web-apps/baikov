<template>
  <!-- <div>Objects</div> из гавного стора взять заголовок страницы -->

  <div class="objects-list">
    <v-list v-model:selected="selectedObject" mandatory :items="objectList"></v-list>
  </div>

  <div class="description">{{ currentObject?.text }}</div>

  <div class="photos-list">
    <v-list v-model:selected="selectedPicture" mandatory :items="currentObject?.photos || []"></v-list>
  </div>

  <div class="image">
    <img :src="selectedPicture[0]" />
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

const selectedPicture = ref([currentObject.value.photos?.[0] || ''])

watch(selectedObject, () => {
  // На всякий случай проверяем, что отфильтрованный список не пустой
  if (photosList.value.length > 0) {
    // Берем САМЫЙ ПЕРВЫЙ элемент из нового отфильтрованного списка
    const firstItemValue = photosList.value[0].value

    // Принудительно устанавливаем его как выбранный во втором списке
    selectedPicture.value = [firstItemValue]
  } else {
    selectedPicture.value = [] // Если элементов нет, очищаем выбор
  }
})

</script>