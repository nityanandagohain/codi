<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" height="250em">
    <router-link to="/home"><p class="h1 mb-2"><b-icon icon="house-fill"></b-icon></p></router-link>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
