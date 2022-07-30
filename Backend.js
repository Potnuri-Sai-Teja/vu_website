const express=require("express");
const app=express();

const cors=require("cors");

app.use(cors({
  origin: [
    'http://localhost:8080',
    'https://localhost:8080'
  ],
  credentials: true,
  exposedHeaders: ['set-cookie']
}));

const bodyParser=require("body-parser");
app.use(bodyParser.json({
  limit:"10mb"
}));
app.use(bodyParser.urlencoded({limit:"10mb",extended:true,parameterLimit:500}))

// multer setup

const path =require("path");
const d = new Date();
const my_month=d.getMonth()+1;
const my_date= d.getFullYear()+""+my_month+""+d.getDate();

const multer = require("multer");


const storage=multer.diskStorage({

      destination :(req,file,cb) =>{
          cb(null,"./src/images")

      },
      filename:(req,file,cb)=>{

        cb(null, path.parse(file.originalname).name + '_' + my_date+ path.extname(file.originalname))
          let my_path=path.parse(file.originalname).name
          console.log(my_path)

      },

});

const upload=multer({storage:storage})


//multer end


const mysql=require("mysql");
// connection to the dtabase
const connection=mysql.createConnection({

          host : 'localhost',
          user : 'root',
          password : "",
          database : "vue_project"
});

connection.connect(err =>{
    if(err)
    {
      return err;
    }
    else
    {
      console.log("success")
    }

})


// create a  table
 /*var create_table_sql="CREATE TABLE users(id int AUTO_INCREMENT primary key NOT NULL,username VARCHAR(255),password VARCHAR(255),language VARCHAR(255),gender VARCHAR(255),address VARCHAR(255),phone VARCHAR(255),emaild VARCHAR(255))";
 //CREATE table category (cat_id int AUTO_INCREMENT PRIMARY key,cat_name varchar(256)); 
 //CREATE table brands(b_id int AUTO_INCREMENT PRIMARY KEY,b_category_id int,b_name varchar(256));  
//create TABLE products (p_id int AUTO_INCREMENT PRIMARY key,p_cat_id int,p_brand_id int,p_name varchar(256),p_description varchar(256),p_price int,p_quantity int,p_images LONGTEXT);  
CREATE table cart(c_id int AUTO_INCREMENT PRIMARY key,c_user varchar(256), c_p_id int, c_p_name varchar(256),c_p_price int,c_p_image varchar(256),status1 varchar(256));  
CREATE table shopping(transaction_id int AUTO_INCREMENT PRIMARY key,user_name varchar(256),phone varchar(256),location LONGTEXT,product_list varchar(256),product_prices varchar(256),total_cost BIGINT,user_id varchar(256),transaction_status varchar(256),delivery_status varchar(256),delivery_date varchar(256)); 
connection.query(create_table_sql,function(err,result){
      if(err)
      {     
        console.log(err)
      }
      else{
        res.send({code:201});
        console.log("Done");
      }
      })*/


app.post("/register",async (req,res)=>{

    var Full_name= await req.body.username;
    var Password= await req.body.password;
    var Language= await req.body.language;
    var Language1=Language.join(",");
    var Gender= await req.body.gender;
    var Address=await req.body.address;
    var Phone=await req.body.phone;
    var Emailid=await req.body.emaild;

 //Inserting data into the USERS table
 connection.query("select * from users where emaild=?",[Emailid],function(err,results){
  console.log(results.length)
  if(results.length!==0)
  {
    
    res.send({code:300})
  }
else{
  connection.query("INSERT INTO users (username,password,language,gender,address,phone,emaild) VALUES(?,?,?,?,?,?,?)",[Full_name,Password,Language1,Gender,Address,Phone,Emailid] ,function(err){
    if(!err)
    {
    
      // console.log("hello");
      res.send({code:200})
    }
    else {
    console.log("error",err);
         
    }
      });
    }
  
});
});




app.post("/login",async (req,res)=>{

      const Username1 =await req.body.username1;
      const Password1 = await req.body.password1;



      
     
      connection.query("select * from users where emaild=?",[Username1],function(err,results){
        if(results.length===0)
        {
          

          res.send({status:0})
      }
      else if(results[0].password !== Password1){

        res.send({status:1})
             
      }
      else if(results[0].emaild == Username1 && results[0].password == Password1){
        let admin_name=Username1;
        console.log(admin_name);
        res.send({status:2,type_user:admin_name})  
      }

      });

        

})



//category add

app.post("/category_api",async (req,res)=>{

 let my_category=req.body.category_name;
 let status=0;
        connection.query("select * from category",function(err,results){

            if(results.length!=0)
            {
              let i = 0;
                for(i=0;i<results.length;i++)
                {
                  if(results[i].cat_name == my_category)
                  {
                    status=1;
                  }
                }

                console.log(my_category);
                if(status == 1)
                {
                  res.send({status1:1})
                }
                else{
                  console.log(my_category);
                  connection.query("INSERT INTO category(cat_name) VALUES(?)",[my_category],function(err){
                    if(!err)
                    {
                    
                      // console.log("hello");
                      res.send({status1:0})     
                    } 
                    else{
                      console.log(err);
                    }
                  });
                 
                }



            }
            else{
             console.log(err);
            }


        })

});



app.post("/cateroty_fetch",async (req,res)=>{

  connection.query("select * from category",function(err,results){
    if(results.length!=0)
    {
      let my_category_list=results;
      res.send({list_cat:my_category_list})
    }
  })

});

//fetch cat and 
app.post("/get_brand_cat",async (req,res)=>{

    let cat_name11=req.body.selected_cat;
    let cat_id11=0;
    let i=0;
    let my_brand="";
    let my_cat;
    let cat_len=0;
    let brand_len=0;
    connection.query("select * from category",function(err,result){
        if(result.legth != 0)
        {
           my_cat =result;  
           
            for(i=0;i<result.length;i++)
            {
                if(result[i].cat_name === cat_name11)
                {
                  cat_id11= result[i].cat_id;
                    
                  break;
                }

            }
            cat_len=my_cat.length;
          
          
            if(cat_id11 == 0){
              res.send({cat_list:my_cat,cat_list_len:cat_len,brand_list_len:brand_len,brand_list:my_brand})
              cat_len=0;
            }
            else{

              connection.query("select b_name from brands where b_category_id=?",[cat_id11],function(err1,result1){
                  if(result1.length!=0)
                  {
                    my_brand=result1;
                    brand_len = result1.length;
                    if(brand_len === null)
                    {
                      console.log("come on")
                      brand_len=0;
                    }
                    console.log(brand_len)
                    res.send({cat_list:my_cat,cat_list_len:cat_len,brand_list_len:brand_len,brand_list:my_brand})
                    cat_len=0;

                  }
                  else
                  {
                    my_brand=[];
                    brand_len=0;
                    res.send({cat_list:my_cat,cat_list_len:cat_len,brand_list_len:brand_len,brand_list:my_brand})
         
                    console.log(err1)
                  }

              })

            }

            

        }

    })



});

//add new brand

app.post("/add_brand",async (req,res)=>{

      let selected_cat=req.body.selected_category;
      let brand_name =req.body.New_brand;

      connection.query("select * from brands where b_name=?",[brand_name],function(err,results){
        if(results.length == 0)
        {

          
          connection.query("select cat_id from category where cat_name=?",[selected_cat],function(err1,result1){
            if(result1.length!=0){
                let my_brand_id=result1[0].cat_id;
                connection.query("INSERT INTO brands (b_category_id,b_name) VALUES(?,?)",[my_brand_id,brand_name],function(err11){
                    if(!err11){
                      res.send({status_insert:2})
                    }
                    else
                    {
                      res.send({status_insert:0})
                      console.log(err11);
                    }

                })

            }
            else{
              console.log(err1);
            }


          })
          
        }
        else{
          res.send({status:1})

        }


      })


})


// getting categories dynamically

app.post("/my_data1",async(req,res)=>{

  let my_data;
  let records;
  let my_status;
 let my_brands;
let my_item_count;
let mobile_brands;
  let my_code=req.body.check_status
  
  if(my_code===0){
  connection.query("select cat_name from category",function(err,results){
    if(results.length!==0)
    {    
      my_data= results;
       records=results.length;
        my_status=200
     res.send({my_list:my_data,count:records,status:my_status})
 
 
      }       
   else{
    console.log("worest");
   }
  });
}
else if(my_code===200)
{
  const my_item = req.body.selected_item;
  const my_selected_item ="Mobile";
  let brand_count=1;
  
  
  connection.query("select b_name from brands join category ON  cat_id = b_category_id where cat_name=?",[my_item],function(err,result1){
    if(result1.length!==0)
    {

       my_brands=result1;
       my_item_count=my_brands.length;
     
      my_status=0;
    
      if(my_item != my_selected_item){

        mobile_brands=[];
        brand_count =1;
       

      }
      else{
             mobile_brands=result1;
        brand_count =mobile_brands.length;

        
      }
      

      res.send({brands1:my_brands,brand_count:my_item_count,status:my_status,mobile_brands_list:mobile_brands,brands_remove_count:brand_count})
      
     

    }
    else{
      my_item_count=0;
      my_status=0;
      res.send({brand_count:my_item_count,status:my_status})
    }
  });

 
  
} 
});


// Add product Details

app.post("/add_product_list",upload.array('pics[]'),async (req,res)=>{


    //let category = await req.body.selected_cat;
     let brand = await req.body.select_brand;
     let product_name = await req.body.p_name;
      let product_description = await req.body.p_description;
     let product_price = await req.body.p_price;
     let product_quantity = await req.body.p_quantity;
     let Product_images = await req.files;
     let list_images=[];

     for(let i=0;i<req.files.length;i++)
     {
          list_images[i] = Product_images[i].filename;
          console.log(Product_images.length)
     }
      Product_images=[];
     let upload_images1=list_images.join(",");

     
    let brand_id =0;
    let cat_id=0;
  console.log(upload_images1)  
 
  connection.query("select * from brands where b_name=?",[brand],function(err,result){
    if(result.length != 0)
    {
      cat_id=result[0].b_category_id;
      brand_id=result[0].b_id;
      
        connection.query("select * from products where p_name=?",[product_name],function(err1,result1){
          if(result1.length != 0){
            console.log(result1.length);
            res.send({my_status1:0})
          }
          else
          {
            connection.query("INSERT INTO products(p_cat_id,p_brand_id,p_name,p_description,p_price,p_quantity,p_images) VALUES(?,?,?,?,?,?,?)",[cat_id,brand_id,product_name,product_description,product_price,product_quantity,upload_images1],function(err12){
             if(!err12){
              res.send({my_status1:2})
             }

            })
          }
        })



    }
    else{
      console.log(err);
    }

  })






});




app.post("/fetch_brands_list",async(req,res)=>{

    
   let brand_name = req.body.send_brand;

   connection.query("select b_id from brands where b_name=?",[brand_name],function(err,result){
      if(result.length != 0)
      {
        let brand_id = result[0].b_id;
        
          connection.query("select * from products where p_brand_id=?",[brand_id],function(err1,result1){

                if(result1.length !=0)
                {
                    let all_data =result1;
                    let product_ids=[];
                    let all_brand_images=[]
                    for(let i=0;i<all_data.length;i++)
                    {
                        product_ids[i] = all_data[i].p_id;
                        all_brand_images[i]=all_data[i].p_images;
                    }


                  res.send({pro_ids:product_ids,pro_brand_images:all_brand_images,pro_list : result1.length})

                }

          })

      }


   })

});




app.post("/fetch_product_details",async (req,res)=>{

    let selected_product_id= req.body.product_id

    connection.query("select * from products where p_id=?",[selected_product_id],function(err,result){

        if(result.length !=0)
        {
            let product_data = result;
              res.send({status:2,p_data:product_data})
        }
        else
        {
          res.send({status:0})
        }

    })

})


app.post("/addtocart1",async(req,res)=>{

      let id_1 = req.body.product_id_choosen;
      let price =req.body.product_price;
      let image_1 =req.body.image_1;
      let my_name = req.body.user_check;
      let selected_product = req.body.s_pro_name;
      let p_status="PENDING";

connection.query("INSERT INTO cart (c_user,c_p_id,c_p_name,c_p_price,c_p_image,status1)VALUES(?,?,?,?,?,?)",[my_name,id_1,selected_product,price,image_1,p_status])
      res.send({dat_status:2});
});


app.post("/fetch_user_cart",async(req,res)=>{

          let user = req.body.username1 ;
          let check_status = "PENDING";

          connection.query("select * from cart where c_user=? AND status1=?",[user,check_status],function(err,result){

                if(result.length != 0){

                    let cart_data = result;
                    let cart_length = result.length;

                    res.send({cart_data1:cart_data,cart_length1:cart_length})

                }
                else{
                  res.send({cart_length1:0})
                  console.log(err);
                }

          })
});


app.post("/delete_item_cart",async(req,res)=>{

    let del_id = req.body.del_item_id;
    connection.query("delete from cart where c_id=?",[del_id])
    res.send({del_status:2})

});


app.post("/purchaseing",async(req,res)=>{

       let User_name=req.body.name1;
       let phone_number =req.body.phone1;
       let address =req.body.address1;
       let product_list1= req.body.product_names12;
      
       let product_prices1 =req.body.product_price12;
      // let check_size = req.body.check_length1;
      
       let total_cost = req.body.Total_price1;
       let User_id1 = req.body.User_id;
       let transaction_status1 = req.body.transaction_status;
       let Delivery_status1 = req.body.Delivery_status;
       let Delivery_date1 = "";
  

connection.query("INSERT INTO shopping(user_name,phone,location,product_list,product_prices,total_cost,user_id,transaction_status,delivery_status,delivery_date)VALUES(?,?,?,?,?,?,?,?,?,?)",[User_name,phone_number,address,product_list1,product_prices1,total_cost,User_id1,transaction_status1,Delivery_status1,Delivery_date1],function(){
 
      res.send({status:2});
    


})


})



app.post("/confirm_payment",async(req,res)=>{

        let userid_11 = req.body.userid_2;
        let my_sec_key = req.body.my_sec_key_check;
        let product_id_check =req.body.p_c_id
        let t_status="CONFIRMED";

        let presenddate = new Date();
      presenddate.setDate(presenddate.getDate() +7 );
      var d=presenddate.getDate();
       var m=presenddate.getMonth()+1;
       var y=presenddate.getFullYear();

       let fetched_product_id=0;
       let product_quantity1=0;

       let update_quantity =0;


       let fetched_product_id1 = 0;
       let update_quantity1=0;
       let product_quantity11 =0;



var my_date =d+"/"+m+"/"+y;


console.log(my_sec_key);
    connection.query("update shopping SET transaction_status=?,delivery_date=? where user_id=?",[t_status,my_date,userid_11])

    if(my_sec_key == 420){  

      connection.query("select * from products where p_id=?",[product_id_check],function(err1,result1){
        if(result1.length !=0)
        {
            let fetched_products1 = result1;

            product_quantity11 = fetched_products1[0].p_quantity;

                    console.log(product_quantity11)
                    fetched_product_id1 = product_id_check;
              update_quantity1 = product_quantity11 - 1;
            
              
              connection.query("update products SET p_quantity=? where p_id=?",[update_quantity1,fetched_product_id1])

     

    }
  })
  res.send({status:2,my_key1:777})

} 
  else{
    connection.query("select * from cart where c_user=?",[userid_11],function(err,result_check){

          if(result_check.length!=0){

              let fetched_data= result_check;

              for(let i=0;i<fetched_data.length;i++)
              {
                  fetched_product_id = fetched_data[i].c_p_id;
                  console.log(fetched_product_id);

                  connection.query("select * from products where p_id=?",[fetched_product_id],function(err1,result1){
                    if(result1.length !=0)
                    {
                        let fetched_products = result1;

                        product_quantity1 = fetched_products[0].p_quantity;

                                console.log(product_quantity1)
                                fetched_product_id = fetched_data[i].c_p_id;
                          update_quantity = product_quantity1 - 1;
                          console.log(update_quantity+"next"+fetched_product_id+i);
                          
                          connection.query("update products SET p_quantity=? where p_id=?",[update_quantity,fetched_product_id])

                          
                        console.log("success")
                    }


                  })
                  product_quantity1=0;  
                          update_quantity=0;
                          fetched_product_id=0;

              }



          }

    })
    connection.query("delete from cart where c_user=?",[userid_11])

    res.send({status:2,my_key1:1})
    
  
  }

    





})



app.post("/fetchorders",async (req,res)=>{

  let user_id_fetch = req.body.userid;
  let tr_status = "PENDING";
  let dr_status ="PENDING";
console.log(user_id_fetch+"check")
    connection.query("delete from shopping where  user_id=? AND transaction_status=?",[user_id_fetch,tr_status])

    connection.query("select * from shopping where user_id=? AND delivery_status=?",[user_id_fetch,dr_status],function(err,result){
      console.log(result.length); 
      if(result.length != 0)
        {
          let my_orders_data = result;
          let order_len = result.length;
          console.log(my_orders_data);
            
          res.send({my_orders :my_orders_data,status:2,orders_length:order_len})

        }
        else{
          res.send({status:0})
        }

    })

})


app.post("/cancel_order",async (req,res)=>{

      let tr_id = req.body.tr_cancel_id;
      
      
     // let can_p_length =0;
      //let c_p_i="";
  
      let p_name1="";
          
          connection.query("select * from shopping where transaction_id=?",[tr_id],function(err,result){
                  if(result.length != 0){

                    let my_data =result[0].product_list;
                    my_data =my_data.split(",");
                    let length1 = my_data.length;
                    console.log(length1+"check")
                   for(let j=0;j<length1;j++)
                   {

                         p_name1 =my_data[j];
                         console.log(my_data[j]+"check")
                        connection.query("select * from products where p_name=?",[p_name1],function(err1,result1){
                          if(result1.length !=0)
                       {
                      let my_p_data=result1;
                      let p_quantity1 = my_p_data[0].p_quantity;
                      p_quantity1 = p_quantity1 + 1;

                      let p_c_n=my_p_data[0].p_name;

                      
                      


                      connection.query("update products SET p_quantity=? where p_name=?",[p_quantity1,p_c_n])
                    
                  
                       }
                      })

                    

                   }
                  }

          })
      

      connection.query("delete from shopping where transaction_id =?",[tr_id])
      res.send({can_status:2})

})

const PORT=5000 || process.env.PORT

app.listen(PORT,()=> console.log(`listening on port ${PORT}`));