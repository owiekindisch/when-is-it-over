<template>
  <div id="app">
    <nav id="nav">
      <router-link to="/about">< mehr über</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import './assets/seedrandom.js'
export default {
  name: 'App'
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  position: relative;
  z-index: 99;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
