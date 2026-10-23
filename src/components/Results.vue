<template>
  <div class="results-container" style="display: flex; gap: 20px;">
    <v-img src="/images/results/1.png"
      style="width: calc(var(--main-width) / 1.5); margin-left: auto; margin-right: auto;" />
    <div>
      <h2>
        {{ populationGrowth.title }}
      </h2>
      <p>
        {{ populationGrowth.text }}
      </p>
      <h2>
        {{ tradeGrowth.title }}
      </h2>
      <p>
        {{ tradeGrowth.text }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const title = 'роста населения и торгового оборота'
const populationGrowth = {
  title: 'Как инфраструктура рождает мегаполис: рост населения Ростова при А. М. Байкове',
  text: 'График наглядно демонстрирует феномен "байковской эпохи": за 27 лет с момента прихода Андрея Байкова к власти население Ростова выросло более чем в 5 раз',
}
const tradeGrowth = {
  title: 'Преобразования Байкова в цифрах: ликвидация барьеров и триумф капитала',
  text: 'График отражает переход Ростова от хаотичной провинциальной торговли к статусу экономического лидера Юга России. До Байкова город задыхался без свободных денег. Создание Конторы Государственного банка (1861 г.) и Общества взаимного кредита дали местным купцам дешёвые оборотные кредиты, убрав зависимость от столичных ростовщиков. ',
}
</script>

<style scoped>
p {
  font-size: 20px;
}

.results-container>* {
  flex: 1;
}
</style>