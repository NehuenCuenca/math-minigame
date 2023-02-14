<template>
  <CountDown @onFinishCountDown="showGame" v-if="!isCountDownFinished" />

  <form v-if="!isGameFinished && isCountDownFinished">
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

    <InGameOptions v-if="!isGameFinished" @receiveGameOption="runGameOption" />
  </form>

  <div v-if="isGameFinished" id="end-game">
    <TimesBoard />

    <div class="info">
      <h2>CalculosX{{ quantityExercises }}</h2>
      <div class="block">
        <span class="block-sub-title">Tiempo usado</span>
        <span class="block-value">{{ seconds }} segundos</span>
      </div>
      <div class="block">
        <span class="block-sub-title">Penalizacion</span>
        <span class="block-value">
          Errores: {{ missedExercises }} x 5sec. =
          {{ missedExercises * 5 }}</span
        >
      </div>
      <div class="block">
        <span class="block-sub-title">Tiempo total</span>
        <span class="block-value">{{ totalTime }} segundos</span>
      </div>
    </div>

    <InGameOptions @receiveGameOption="runGameOption" />
  </div>
</template>

<script>
import {
  generateSum,
  generateMultiplication,
  generateSubtraction,
} from "@/helpers/Exercise";
import { saveTime } from "@/helpers/TimeBoard";
import CountDown from "@/components/CountDown";
import Exercise from "@/components/Exercise";
import InGameOptions from "@/components/InGameOptions";
import TimesBoard from "@/components/TimesBoard";

export default {
  name: "MathGame",

  components: { Exercise, InGameOptions, TimesBoard, CountDown },

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
      missedExercises: 0,
      totalTime: 0,
      timer: null,
      seconds: 0,
      isGameFinished: false,
      isCountDownFinished: false,
    };
  },

  emits: ["finishGame"],

  methods: {
    showGame(boolean) {
      this.isCountDownFinished = boolean;
      this.startTimer();
    },
    runGameOption(option) {
      this[option]();
    },
    goToMenu() {
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
      const results = this.exercises.map(({ operation, answer }) => {
        const result = eval(operation) === answer;
        if (!result) {
          this.missedExercises++;
        }
        return result;
      });
      this.totalTime = this.seconds + this.missedExercises * 5;

      // Son todos correctos
      if (this.missedExercises === 0) {
        saveTime(this.totalTime);
      }
    },
    finishGame() {
      this.isGameFinished = true;
      this.stopTimer();
      this.checkResults();
    },
    startNewGame() {
      this.missedExercises = 0;
      this.totalTime = 0;
      this.exercises = [];
      this.stopTimer();
      this.isGameFinished = false;
      this.isCountDownFinished = false;
      this.generateExercises();
      this.showGame();
    },
    startTimer() {
      this.seconds = 0;
      clearInterval(this.timer);
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

#end-game {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 4vh;
}

#end-game h2 {
  margin: 0;
  text-decoration: underline;
}
.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 2vh;
}

.block {
  padding: 1rem;
  border: 1px solid black;
  border-radius: 1rem;
  background-color: aliceblue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 2vh;
}

.block-sub-title {
  background-color: grey;
  color: white;
  font-size: 1.5rem;
  padding: 1rem;
  border-radius: 1rem;
}

.block-value {
  font-size: 1.3rem;
  color: black;
}
</style>
