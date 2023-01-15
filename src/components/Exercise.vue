<template>
  <label class="exercise" v-show="visible && !isAnswered">
    <span>{{ operationWithEqual }}</span>
    <input type="text" v-model.number="answer" @keypress.enter="saveAnswer" :ref="`input${id}`"/>
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
    clearInput(){
      this.answer = ''
    },
    saveAnswer() {
      const { answer, id } = this;
      
      this.$emit("saveAnswer", { answer, id });
      this.isAnswered = true;
    },
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
    }
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
  font-size: 1.7rem;
}

.exercise input {
  font-size: 1.3rem;
  text-align: center;
  padding: 0.7rem;
  border: none;
  outline: none;
  border-radius: 1rem;
}

.hidden {
  display: none;
}

button#erase{
  font-size: 1.3rem;
  padding: 1rem 5rem;
  cursor: pointer;
}
button#erase:hover{
  transition: all .3s ease;
  background-color: red;
  color: white;
}
</style>
