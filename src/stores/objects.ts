import { defineStore } from 'pinia'

interface ObjectItem {
  title: string;
  text: string;
  photos: string[];
}

interface ObjectsState {
  objects: Record<string, ObjectItem>;
}

export const useObjectsStore = defineStore('objects', {
  state: (): ObjectsState => ({
    objects: {
        'мост': {
            title: 'Мост через Генеральную балку',
            text: 'Мост через Генеральную балкуМост через Генеральную балкуМост через Генеральную балку',
            photos: ['/images/most/imgonline_com_ua_PicOnPic_Ows93UYrMmnVU.jpg'],
        },
        'водопровод': {
            title: 'Водопровод',
            text: 'Водопровод Водопровод Водопровод',
            photos: [
                'images/vod/55u574f1ltvtr8lu8f.webp',
                'images/vod/2650075 Внутри английских фильтров Ростовской водопроводной станции - 4(1).jpg',
                'images/objects/vod/2651810 План водопроводной станции города Ростова-на-Дону.jpg',
            ],
        },
        'канализация': {
            title: 'Канализация',
            text: 'Водопровод Водопровод Водопровод',
            photos: ['images/kan/1.jpg', 'images/kan/2.jpg', 'images/kan/3.jpg'],},
        'богадельня': {
            title: 'Петропавловская богадельня',
            text: 'Водопровод Водопровод Водопровод',
            photos: ['images/petr/2472581 Петропавловская богадельня в деталях.png'],},
        'гирла': {
            title: 'Расчистка донских гирл',
            text: 'Облегчение судам входить в Азовское море',
            photos: [
                'images/girl/Очистка дна Дона от камней на территории Ростова-на-Дону.jpg',
                'images/girl/Титульный лист книги контр-адмирала П.Е. Белявского bhДонские гирлаor.jpg',
            ],
        },
        'санитарная лаборатория': {
            title: 'Санитарная лаборатория',
            text: 'Конец эпидемиям холлеры',
            photos: ['images/control/604376469.jpg'],

        },
    },
  }),
  
  getters: {
    getObjects: (state) => state.objects,
    objectsNames: (state) => Object.keys(state.objects || {})
  },
})
