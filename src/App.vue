<template>
  <div id="app">
    <h1>Hello App!</h1>
    <p>
      <router-link to="/"> HelloWorld </router-link>
      <router-link to="/nhl"> NHL </router-link>
    </p>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
