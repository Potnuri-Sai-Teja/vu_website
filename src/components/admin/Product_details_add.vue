<template>
      <div class="app">
    <div id="nav">
         <router-link to="/Admin_home_page">Home</router-link> | 
     <router-link to="/Category_add_page">Category</router-link> | 
     <router-link to="/Brands_add">ADD New Brand</router-link>|
     <router-link to="/" >Logout</router-link>
    </div>
    <router-view/>
    

        <div>
            <h1> WELCOME TO ADD NEW PRODUCT</h1>
            <form @submit.prevent="add_product_details">
            <div>
                <label>Caegory</label>
                <select @click="category" v-model="selected_cat">
                <option value="brand"> Select one </option>
                <option v-for="(item,index) in my_category " :value="item"  :key="index"> {{item}}</option>
                </select>
                </div>
                <div>
                     <label>Caegory</label>
                    <select v-model="select_brand">
                    <option>Select One </option>
                    <option v-for="(item,index) in my_brand" :value="item" :key="index">{{item}} </option>
                    </select>
                    </div>
            
            <div>
                <label> PRODUCT NAME </label>
                <input type="text" v-model="p_name" name="p_name" required/>
                </div>

                <div>
                    <label> Brief Product Description </label>
                    <textarea v-model="p_description" name="p_description"> </textarea>
                    </div>
                <div>
                    <label> Price </label>
                    <input type="text" v-model="p_price" name="p_price"  required/>
                    </div>

                  <div>
                    <label> Quantity Available </label>
                  <input type="text" v-model="p_quantity" name="p_quantity"  required/>

                    <div>
                      <input type="file" @change="onSelected" name="selected_file" multiple />
                     </div>

                   
                    </div>  
                    <input type="submit" value="Submit">
                    </form>
        </div>

</div>   
</template>

<script>
import axios from 'axios'
export default{
    data(){
        return {
            my_category :[],
            my_brand : [],
            selected_cat:'',
            select_brand:'',
            p_name:'',
            p_description:[],
            p_price:0,
            p_quantity:0,
            cat_length:0,
            brand_length:0,
            selected_file:"",
            my_images :[]
        }
    },
    created(){
        axios.defaults.baseURL="http://localhost:5000"
    },
    methods:{
            async category(){

                axios.post("/get_brand_cat",{

                        selected_cat:this.selected_cat

                }).then((res)=>{

                    this.cat_length=res.data.cat_list_len;
                    this.brand_length=res.data.brand_list_len;
                    
                    let i=0;
                    let j=0;
                    let k=0;
                    for(i=0;i<this.cat_length;i++)
                    {
                        this.my_category[i]=res.data.cat_list[i].cat_name;
                    }
                    for(j=0;j<this.brand_length;j++)
                    {
                        this.my_brand[j]=res.data.brand_list[j].b_name;
                    }
                    
                     if(this.brand_length != this.my_brand.length){
                        let check_brand_length=this.my_brand.length;
                    for(k=this.brand_length;k<check_brand_length;k++)
                    {
                         this.my_brand.splice(k);
                    }
                    
                    }





                })
            },
            async onSelected(e){
                  const selected_files = e.target.files;
                 //   this.selected_file=selected_file;
                
                for(let i=0;i<selected_files.length;i++)
                {
                     this.my_images.push(selected_files[i]);
                    
                }

            },
            async add_product_details(){

                 const fd=new FormData();

                for(let j=0;j<this.my_images.length;j++){
                         fd.append('pics[]',this.my_images[j])
                         
                }

             
              fd.append('selected_cat',this.selected_cat)
              fd.append('select_brand',this.select_brand)
              fd.append('p_name',this.p_name)
              fd.append('p_description',this.p_description)
              fd.append('p_price',this.p_price)
              fd.append('p_quantity',this.p_quantity)


                axios.post("/add_product_list",fd).then((res)=>{

                          console.log(res.data.my_status1)

                            if(res.data.my_status1 == 0)
                            {
                                alert("product Already Exist");
                                   this.$router.push('/Product_details_add')
                            }
                            else if(res.data.my_status1 == 2)
                            {
                                alert("Data Updated");
                                this.my_category =[];
                                 this.my_brand=[];
           
                                    this.$router.push('/Admin_home_page')
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