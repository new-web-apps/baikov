// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    mainTexts: {
      menuText: {
        pagePremise: 'Предпосылки',
        pagetTansformations: 'Преобразования',
        pageStat: 'Итоги преобразования',
        pagePerson: 'Личность',
        pageObjects: 'Объекты',
      },
    },
    images: {
      logo: '/images/logo.png',
      banner: '/images/banner.jpg'
    }
  }),
  getters: {
    getMainTexts: (state) => state.mainTexts,
    getImages: (state) => state.images,

    // getFullPageInfo() {
    //   return `${this.getTitle} — ${this.state.texts.description}`;
    // }
  }
})
