<template>
  <h3 id="title">🏆Mejores 3 tiempos🏆</h3>
  <ol id="times-board">
    <li v-for="(time, index) in times" :key="index">{{ time }} segundos</li>
  </ol>
</template>

<script>
import { getTimesSaved } from "@/helpers/TimeBoard";
export default {
  data() {
    return {
      times: [],
    };
  },
  created() {
    this.times = getTimesSaved();
  },
};
</script>

<style scoped>
#title{
  margin: 0;
  text-transform: uppercase;
  text-decoration: underline;
  text-underline-offset: .5rem;
}

ol#times-board {
  margin: 0;
  list-style-type: upper-roman;
  font-size: 1.2rem;
}
</style>
