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
                'images/vod/2651810 План водопроводной станции города Ростова-на-Дону.jpg',
                'images/vod/a20xyx7xcs8skly76f.webp',
                'images/vod/bkue.jpg',
                'images/vod/dh8a9gcso3w8k900dm.webp',
                'images/vod/m89yclq9i8wg2xop99.webp',
                'images/vod/pervyy_vodoprovod1_0.jpg',
                'images/vod/rotold.jpg',
                'images/vod/uzid71ryobg58pq6ew.webp',
            ],
        },
        'канализация': {
            title: 'Канализация',
            text: 'Водопровод Водопровод Водопровод',
            photos: [
              'images/kan/5nxyzwvzgr43ffii952orzrkp9j01qh8.jpg',
              'images/kan/2650071 Торжественная закладка перед строительством английский фильтров.jpg',
              'images/kan/2650074 Внутри английских фильтров Ростовской водопроводной станции - 5.jpg',
              'images/kan/xn8bhcfl1icjfapot2ntox81id50skt4.jpg',
              'images/kan/3yy9jayfytbkq11vui4d7prk4ky713zh.jpg',
            ],},
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
