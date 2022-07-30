<template>

       <div class="app">
    <div id="nav">
    <ul>
        <li> <router-link to="/User_home_page">Home</router-link></li>
        <li><router-link to="/User_about_page">ABOUT us</router-link></li>
        <li>  <router-link to="/View_your_orders_page">View ORDERS</router-link></li>
        <li> <router-link to="/">Logout</router-link></li>
    </ul>
         </div>
    
<div class="register-form">
    <h4> Thank You for Shooping</h4>
      <p> YOUR ORDER WAS SUCCESS FULL CLICK BELOW VIEW MY ORDERS TO SEE YOUR ORDERS </p>
      <div class="register">
      <input type="submit" class="submit-button" value="View Your Orders" @click="vieworders">
      </div>
    </div>

    </div>
</template>
<script>
export default{
  data(){
    return {

    }
  },
  methods :{
      async vieworders(){
         this.$router.push({name:'View_your_orders_page'})
      }
  }
}
</script>


<style lang="scss">
         .app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

   .nav {
    padding: 30px;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
    .register-form{
      h4{
          padding: 10px 0;
      }
      p{
          padding: 10px 0;
      }
      input{
            padding: 10px 0;
             width: 140px;
      }
    }
</style>