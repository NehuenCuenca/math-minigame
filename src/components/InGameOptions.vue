<template>
    <ul>
      <li class="option" @click="$emit('receiveGameOption', 'startNewGame')">Jugar otra vez</li>
      <li class="option" @click="$emit('receiveGameOption', 'goToMenu')">Ir al menu</li>
    </ul>
</template>

