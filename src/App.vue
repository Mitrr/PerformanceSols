<template>
  <div id="app">
    <side-bar/>
    <nav-bar></nav-bar>
    <div class="content__container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'

export default {
  name: 'app',
  components: {
    NavBar,
    SideBar
  },
  computed:{}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
  .content__container{
    margin-left: 250px;
    padding: 40px 20px;
    background-color: #f3f6f9;
  }
  p {
    display: block;
    margin-block-start: 0.2em;
    margin-block-end: 0.2em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }
</style>
