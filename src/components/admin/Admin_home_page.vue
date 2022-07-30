<template>
      <div class="app">
    <div id="nav">
         <router-link to="/Admin_home_page">Home</router-link> | 
     <router-link to="/Category_add_page">Category</router-link> | 
     <router-link to="/Product_details_add">Product_details</router-link>|
     <router-link to="/Brands_add">ADD New Brand</router-link>|
     <router-link to="/" >Logout</router-link>
    </div>
    <router-view/>
    </div>
<h1><center> WELCOME TO ADMIN</center> </h1>
</template>


<style lang="scss">
   
         .app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

   #nav {
    padding: 30px;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
  
    
</style>