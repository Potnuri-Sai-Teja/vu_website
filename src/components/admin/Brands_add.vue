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
    
    <div>
<h1> WELCOME TO Brand Page </h1>

        <form @submit.prevent="add_brand">
                <div>
                        <label> Category </label>
                        <select v-model="selected_category" @click="category_fetch">
                            <option value="check">Select One </option>
                            <option v-for="(item,index) in categories" :value="item" :key="index">{{item}} </option>
                            </select>
                    </div>
                    <div>
                        <label>New Brand</label>
                        <input type="text" v-model="New_brand" name="New_brand" required/>
                        </div>
                    <input type="submit" value="submit"/>
        </form>

</div>

</div>
</template>
<script>
import axios from "axios";
export default{
    data(){
        return{
            selected_category:'',
            categories:[],
            categories_id:[],
            cate_count:0,
            New_brand:'',
            status1 :0,
            status_brand:0
        }
    },
    created(){
        axios.defaults.baseURL="http://localhost:5000/"
    },
    methods:{
        async category_fetch(){

                axios.post("/cateroty_fetch").then((res)=>{

                        this.cate_count=res.data.list_cat.length;
                            let i=0;
                        for(i=0;i<this.cate_count;i++)
                        {
                           this.categories[i]=res.data.list_cat[i].cat_name; 
                        }

                })

        },
        async add_brand(){

                if(this.selected_category == "check"){
                        alert("Kindly select categoty ");

                }
                else{

            axios.post("/add_brand",{
                selected_category:this.selected_category,
                New_brand :this.New_brand

            }).then((res)=>{

                    this.status1=res.data.status;
                    this.status_brand=res.data.status_insert;

                    if(this.status1==1){
                        alert("Brand already exist");
                    }
                    else
                    {
                        if(this.status_brand==2){
                            alert("Data inserted")
                        }

                    }


            })
        }
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