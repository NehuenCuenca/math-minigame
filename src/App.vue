<template>
  <Menu />
</template>

<script>
import Menu from "@/components/Menu";

export default {
  name: "App",
  components: { Menu },
};
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  font-size: 16px;
}

html {
  box-sizing: border-box;
  font-family: "JetBrains Mono", monospace;
  scroll-behavior: smooth;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: auto;
  min-height: 100vh;
  background: lightsteelblue fixed center;
  background-size: cover;
  padding: 12% 0 5% 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  row-gap: 5vh;
}
</style>
