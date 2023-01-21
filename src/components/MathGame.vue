<template>
  <form v-if="!win || !lose">
    <h1 id="timer" :class="seconds < 14 ? 'green' : 'yellow'">
      {{ seconds }}"
    </h1>

    <Exercise
      v-for="({ id, operation, visible }, index) in exercises"
      :key="index"
      :id="id"
      :operation="operation"
      :visible="visible"
      @saveAnswer="saveAnswer"
    />

    <InGameOptions v-if="!win && !lose" @receiveGameOption="runGameOption" />
  </form>

  <div v-if="win || lose">
    <h2 v-if="win" class="green">Ganaste! Acertaste todas las cuentas 🤯🤯</h2>
    <h2 v-if="lose" class="red">Perdiste! Fallaste en alguna cuenta 😅</h2>

    <InGameOptions @receiveGameOption="runGameOption" />
  </div>
</template>

<script>
import {
  generateSum,
  generateMultiplication,
  generateSubtraction,
} from "@/helpers/Exercise";
import Exercise from "@/components/Exercise";
import InGameOptions from "@/components/InGameOptions";

export default {
  name: "MathGame",

  components: { Exercise, InGameOptions },

  props: {
    quantityExercises: {
      type: Number,
      default: 5,
      required: true,
    },
  },

  data() {
    return {
      operations: ["sum", "subtraction", "multiplication"],
      exercises: [],
      win: false,
      lose: false,
      timer: null,
      seconds: 0,
    };
  },

  emits: ["finishGame"],

  methods: {
    runGameOption(callback) {
      this[callback]();
    },
    goToMenu() {
      this.lose = false;
      this.win = false;
      this.exercises = [];
      this.$emit("finishGame", true);
    },
    generateExercises() {
      for (let i = 0; i < this.quantityExercises; i++) {
        const rndIndex = Math.floor(Math.random() * this.operations.length);
        const randomOperation = this.operations[rndIndex];
        let operation;

        switch (randomOperation) {
          case "sum":
            operation = generateSum();
            break;
          case "subtraction":
            operation = generateSubtraction();
            break;
          case "multiplication":
            operation = generateMultiplication();
            break;

          default:
            operation = "WTF";
            break;
        }

        const newExercise = {
          id: i,
          operation,
          answer: "",
          visible: false,
        };

        this.exercises = [...this.exercises, newExercise];
      }

      this.showExercise(0);
      this.startTimer();
    },
    saveAnswer(resp) {
      const { id, answer } = resp;
      this.exercises[id].answer = answer;
      this.hideExercise(id);

      if (this.exercises[id + 1]) {
        this.showExercise(id + 1);
        return;
      }

      this.finishGame();
    },
    showExercise(id) {
      this.exercises[id].visible = true;
    },
    hideExercise(id) {
      this.exercises[id].visible = false;
    },
    checkResults() {
      const results = this.exercises.map(
        ({ operation, answer }) => eval(operation) === answer
      );

      if (results.includes(false)) {
        this.win = false;
        this.lose = true;
      } else {
        this.win = true;
        this.lose = false;
      }
    },
    finishGame() {
      this.checkResults();
      this.stopTimer();
    },
    startNewGame() {
      this.finishGame();
      this.lose = false;
      this.win = false;
      this.exercises = [];
      this.generateExercises();
    },
    startTimer() {
      this.seconds = 0;
      this.timer = setInterval(() => {
        this.seconds++;
      }, 1000);
    },
    stopTimer() {
      clearInterval(this.timer);
      this.timer = null;
    },
  },
  created() {
    this.generateExercises();
  },
};
</script>

<style scoped>
form {
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#timer {
  font-size: 3rem;
  text-shadow: 3px 3px 5px black;
  user-select: none;
}

.green {
  color: rgb(0, 180, 63);
}
.yellow {
  color: rgb(210, 210, 4);
}

ul {
  margin: 0;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  row-gap: 2vh;
}
</style>
