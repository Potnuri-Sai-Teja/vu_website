<template>
      <div class="app">
    <div id="nav">
         <router-link to="/Admin_home_page">Home</router-link> | 
     <router-link to="/Product_details_add">Product_details</router-link>|
     <router-link to="/Brands_add">ADD New Brand</router-link>|
     <router-link to="/" >Logout</router-link>
    </div>
    <router-view/>
    </div>

    <div>
<h1> WELCOME TO Categoty </h1>

        <form @submit.prevent="category_add">
            <div>
             <label> Category Name </label>
            <input type="text" v-model="category_name" name="category_name" required>
            </div>

            <input type="submit"  value="ADD"/>  
            </form>

</div>
</template>
<script>
import axios from 'axios'
export default{
    data() {
        return{
                category_name:""
        }
    },
   created(){
    axios.defaults.baseURL = 'http://localhost:5000';

  },
    methods:{
        async category_add(){

                

                axios.post("/category_api",{
                    category_name:this.category_name
                }).then((res) => {

                    if(res.data.status1 == 1)
                    {
                        alert("Category already exist");

                    }
                    else{
                        alert("Category Updated");
                    }
                })

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