<template>
  <div id="app">
    <side-bar @newRoute="updatePageTitle"></side-bar>
    <nav-bar :title="activeTitle"></nav-bar>
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
    data(){
      return{
        activeTitle:'Справочники'
      }
    },
    methods:{
      updatePageTitle(title){
         this.activeTitle = title;
      }
    }
  }
</script>

<style>
  @import "assets/base-styles.css";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
  .content__container{
    margin-left: 250px;
    padding: 20px;
    background-color: #f3f6f9;
  }
  p {
    display: block;
    margin-block-start: 0.2em;
    margin-block-end: 0.2em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }
  *{
    box-sizing: border-box;
  }
  input{
    border: none;
  }

.caption-text{
  color: #999;
}
.normal-text{
  color: #495057;
}
</style>
