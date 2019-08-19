import Home from '../components/Home';
import LoginPage from '../components/Login';

interface routerConfigModel {
    path:string,
    component?:any,
    auth?:boolean
}
export const routerConfig:routerConfigModel[] = [
    {
        path:'/',
        component:Home,
        auth:true,
    },{
        path:'/home',
        component:Home,
        auth:true,
    },{
        path:'/login',
        component:LoginPage,
    },{
        path:'/404',
        component:Home
    },{
        path:'/Data',
        component:Home,
    },{
        path:'/Data/Components/Tabs',
        component:Home,
    },{
        path:'/Data/Components/Table',
        component:Home,
    },{
        path:'/Carousel',
        component:Home,
    },
];