import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes:[
        {
            path: '/',
            name: 'home',
            component:() => import('./pages/InputParams'),
        },
        {
            path: '/materials',
            name: 'materials',
            component:() => import('./pages/MaterialsHandbook'),
        },
        {
            path:'/add-works',
            name:'add-works',
            component:() => import('./pages/AddWork')
        }
    ]
})
