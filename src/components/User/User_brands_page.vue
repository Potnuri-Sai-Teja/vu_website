<template>
        <div class="app">
    <div id="nav">
    <ul>
      <li> <router-link to="/User_home_page">Home</router-link></li>
      <li> <router-link to="/User_about_page">About US</router-link></li>
      <li> <router-link to="/User_contactus">Contact us</router-link></li>
      <li> <router-link to="/Yourcart_page">CART</router-link></li>
      <li> <router-link to="/View_your_orders_page">View ORDERS</router-link></li>
      <li> <router-link to="/" @click="logout_api">Logout</router-link></li>
    </ul>
      <router-view/>
</div>
  </div>

   <div class="row">
    <div  class="column" v-for="(item,index) in display_images" :key="index">
           <img :src="require(`@/images/${item}`)" @click="product_selected(index)" alt=""/>
      </div>
  </div>


</template>
<script>
import axios from 'axios'
export default{
    data (){
        return{
           my_data:this.$route.params.user_selected_item,
           product_ids1 :[],
           product_images1 :[] ,
           images_check:[]  ,
           display_images : [] ,
           product_choosen: ""       

        }

    },
    created()
    {
          
          axios.defaults.baseURL="http://localhost:5000"
          this.brands_fetch();
    },
    methods:{

              async brands_fetch(){

                   
                  console.log("check every time"+this.my_data);
                  axios.post("/fetch_brands_list",{
                    send_brand : this.my_data
                    
                    }).then((res)=>{

                          let total_products = res.data.pro_list;
                          let count =0;
                       for(let i=0;i<total_products;i++)
                       {
                          this.product_ids1[i] = res.data.pro_ids[i];
                          this.product_images1[i] = res.data.pro_brand_images[i];
                          this.images_check = this.product_images1[i].split(",");

                              for(let j=0;j<this.images_check.length;j++){  
                              let position = this.images_check[j].search("main");
                              
                              if(position != -1)
                              {
                                    this.display_images[count] = this.images_check[j]  
                                    console.log(this.display_images[count])
                                    
                              }
                              }
                              count +=1;

                          
                       }

                    



                  })

              } ,
              async product_selected(id){

                   let product_id_check =  this.product_ids1[id]
                 

              this.$router.push({name:'Product_info',params:{user_selected_p_id:product_id_check}})

                

              }





    },
  }
    
</script>
<style lang="scss">
*{
  box-sizing: border-box;
}  
.column{
    width: 33.33%;
    margin: 31px;
    background: #fff;
    box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 39px 0;
    cursor: pointer;
}
.row{
  display:flex;
}
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
    
</style>
