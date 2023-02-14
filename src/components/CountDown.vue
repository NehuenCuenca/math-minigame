<template>
  <h1 id="count-down">{{ seconds }}</h1>
</template>

<script>
export default {
  name: "CountDown",

  data() {
    return {
      seconds: 3,
      interval: null,
    };
  },

  created() {
    this.seconds = 3;

    setTimeout(() => {
      clearInterval(this.interval);
      this.interval = null;

      this.$emit("onFinishCountDown", true);
    }, 3000);

    this.interval = setInterval(() => {
      this.seconds--;
    }, 1000);
  },
};
</script>

<style scoped>
#count-down {
  font-size: 5rem;
  border: 2px solid black;
  border-radius: 50%;
  padding: 2rem 4rem;
  text-align: center;
}
</style>
