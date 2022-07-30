import {createWebHistory,createRouter} from 'vue-router';
import Home_page from '../components/Home_page.vue';
import Registration_page from '../components/Registration_page.vue';
import Login_page from '../components/Login_page.vue';
import User_home_page from '../components/User/User_home_page.vue'
import About_page from '@/components/About_page.vue';
import Contactus_page from '@/components/Contactus_page.vue';
import User_about_page from '@/components/User/User_about_page.vue';
import User_contactus from '@/components/User/User_contactus.vue';
import User_brands_page from '@/components/User/User_brands_page.vue';
import Admin_home_page from '@/components/admin/Admin_home_page.vue';
import Category_add_page from '@/components/admin/Category_add_page.vue';
import Product_details_add from '@/components/admin/Product_details_add.vue';
import Brands_add from '@/components/admin/Brands_add.vue';
import Product_info from '@/components/User/Product_info.vue';
import Yourcart_page from '@/components/User/Yourcart_page.vue';
import User_delivery_details from '@/components/User/User_delivery_details.vue';
import Payment_page from '@/components/User/Payment_page.vue';
import thank_you_page1 from '@/components/User/thank_you_page1.vue';
import View_your_orders_page from '@/components/User/View_your_orders_page.vue';


const routes=[

        {

                path :"/",
                name:"Home_page",
                component : Home_page,
        },
        {

                path :"/View_your_orders_page",
                name:"View_your_orders_page",
                component : View_your_orders_page,
        },
        {

                path :"/thank_you_page1",
                name:"thank_you_page1",
                component : thank_you_page1,
        },
        {

                path :"/Payment_page",
                name:"Payment_page",
                component : Payment_page,
        },
        {

                path :"/User_delivery_details",
                name:"User_delivery_details",
                component : User_delivery_details,
        },
        {

                path :"/Yourcart_page",
                name:"Yourcart_page",
                component : Yourcart_page,
        },
        {

                path :"/Product_info",
                name:"Product_info",
                component : Product_info,
        },
        {

                path :"/Brands_add",
                name:"Brands_add",
                component : Brands_add,
        },
        {

                path :"/Product_details_add",
                name:"Product_details_add",
                component : Product_details_add,
        },
        {

                path :"/Category_add_page",
                name:"Category_add_page",
                component : Category_add_page,
        },
        {

                path :"/Admin_home_page",
                name:"Admin_home_page",
                component : Admin_home_page,
        },
        {

                path :"/User_brands_page",
                name:"User_brands_page",
                component : User_brands_page,
        },
        {

                path :"/User_about_page",
                name:"User_about_page",
                component : User_about_page,
        },{

                path :"/User_contactus",
                name:"User_contactus",
                component : User_contactus,
        },
        {

                path :"/About_page",
                name:"About_page",
                component : About_page,
        },
        {

                path :"/Contactus_page",
                name:"Contactus_page",
                component : Contactus_page,
        },
        {

            path :"/Registration_page",
            name:"Registration_page",
            component : Registration_page,
    },
    {

        path :"/Login_page",
        name:"Login_page",
        component : Login_page,
},
{

    path :"/User_home_page",
    name:"User_home_page",
    component : User_home_page,
}

];
const router = createRouter({

        history : createWebHistory(),
        routes,
});
export default router;