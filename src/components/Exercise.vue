<template>
  <label class="exercise" v-show="visible && !isAnswered">
    <span>{{ operationWithEqual }}</span>
    <input
      type="text"
      v-model.number="answer"
      @keypress.enter="saveAnswer"
      :ref="`exercise${id}`"
    />
    <button id="erase" @click.prevent="clearInput">Limpiar</button>
  </label>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
    },
    operation: {
      type: String,
    },
    visible: {
      type: Boolean,
    },
  },
  data() {
    return {
      answer: null,
      isAnswered: false,
    };
  },
  methods: {
    clearInput() {
      this.answer = "";
      this.setFocus();
    },
    saveAnswer() {
      if( this.answer === null ) { this.answer = 0 }
      const { answer, id } = this;

      this.$emit("saveAnswer", { answer, id });
      this.isAnswered = true;
    },
    setFocus() {
      const input = this.$refs[`exercise${this.id}`];
      if (!input) { return; }
      this.$nextTick(() => this.$refs[`exercise${this.id}`].focus());
    },
  },
  mounted() {
    this.setFocus();
  },
  computed: {
    operationWithEqual() {
      return `${this.operation} =`;
    },
  },
  watch: {
    operation() {
      this.isAnswered = false;
      this.answer = null;
    },
    visible() {
      if (!this.isAnswered && this.visible) {
        this.setFocus();
      }
    },
  },
};
</script>

<style>
.exercise {
  width: 80%;
  min-height: 5rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 2vh;
}

.exercise span {
  font-size: 3rem;
}

.exercise input {
  width: 80%;
  height: 10rem;
  font-size: 5rem;
  text-align: center;
  padding: 0.7rem;
  border: none;
  outline: none;
  border-radius: 1rem;
}

.hidden {
  display: none;
}

button#erase {
  font-size: 1.3rem;
  padding: 1rem 5rem;
  cursor: pointer;
}
button#erase:hover {
  transition: all 0.3s ease;
  background-color: red;
  color: white;
}
</style>
