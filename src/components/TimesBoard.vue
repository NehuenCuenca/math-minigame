<template>
  <span id="new-record" v-if="newRecord">🥳NUEVO RECORD!🥳</span>
  <h3 id="title">🏆Mejores 3 tiempos🏆</h3>
  <ol id="times-board" v-if="times">
    <li v-for="(time, index) in times" :key="index">{{ time }} segundos</li>
  </ol>
  <p v-else>No hay mejores tiempos todavia!</p>
</template>

<script>
import { getTimesSaved } from "@/helpers/TimeBoard";
export default {
  props: {
    newRecord: {
      type: Boolean,
    },
  },
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
#title {
  margin: 0;
  text-transform: uppercase;
  text-decoration: underline;
  text-underline-offset: 0.5rem;
}

#new-record {
    color: white;
    background-color: red;
    padding: 1rem;
    border-radius: 1rem;
    border: 2px solid white;
    font-size: 1.5rem;
    letter-spacing: 0.4rem;
}

ol#times-board {
  margin: 0;
  list-style-type: upper-roman;
  font-size: 1.2rem;
}
</style>
