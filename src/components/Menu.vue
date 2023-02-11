<template>
  <ul class="options" v-if="!newGame && !showTutorial">
    <li class="option" @click="startNewGame">Nuevo juego</li>
    <li class="option" @click="toggleTutorial">Tutorial</li>
  </ul>

  <MathGame :quantityExercises="quantityExercises" v-if="newGame" @finishGame="finishGame" />

  <div v-if="showTutorial" id="tutorial">
    <button @click="toggleTutorial">Volver al menú</button>
    <h2>🔢⭐Minijuego de matematicas⭐🔢</h2>
    <p>
      El juego consiste en resolver {{quantityExercises}} cuentas aleatorias (hay cuentas de
      multiplication, resta y suma) en el menor tiempo posible.
    </p>
    <u>Controles:</u>
    <ul>
      <!-- <li>Apretá la tecla TAB o tabulador (esta arriba del block mayusc) para que no tengas que clickear en la caja de texto cada vez que vas a responder</li> -->
      <li>
        Para guardar tu respuesta y continuar con la siguiente cuenta tenes que
        apretar la tecla ENTER
      </li>
    </ul>
  </div>
</template>

<script>
import MathGame from "@/components/MathGame";

export default {
  name: "Menu",
  components: {
    MathGame,
  },
  data() {
    return {
      newGame: false,
      quantityExercises: 15,
      showTutorial: false,
    };
  },
  methods: {
    finishGame() {
      this.newGame = false;
    },
    startNewGame() {
      this.showTutorial = false;
      this.newGame = !this.newGame;
    },
    toggleTutorial() {
      this.showTutorial = !this.showTutorial;
    },
  },
};
</script>

<style>
ul.options {
  width: 40%;
  height: auto;
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 5vh;
}

li.option {
  min-width: 10rem;
  padding: 0.5rem;
  border: 2px solid black;
  background-color: cornflowerblue;
  border-radius: 1rem;
  cursor: pointer;
  font-size: 1.2rem;
  color: black;
  user-select: none;
  list-style-type: none;
}

#tutorial {
  width: 50%;
  padding: 1rem;
  height: auto;
  border: 1px solid black;
  border-radius: 1rem 3rem;
  background-color: rgba(0, 170, 255, 0.2);
}

#tutorial button {
  width: 90%;
  padding: 0.5rem 0rem;
  border-radius: 1rem;
  font-size: 1.2rem;
  cursor: pointer;
}

#tutorial p {
  font-size: 1.2rem;
}
</style>
