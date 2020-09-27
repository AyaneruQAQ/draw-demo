import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Hello from './hello.vue'
import NewPage from './newpage.vue'
import Login from './components/login'
import Sprite from './sprite.vue'
import Fabric from './fabric.vue'
import Easel from './easel.vue'
const routes = [
    {
        path:'/login',
        component:Login
    },
    {
        path:'/hello',
        component:Hello
    },
    {
        path:'/easel',
        component:Easel,
        // meta:{requireAuth:true}
    },
    {
        path:'/sprite',
        component:Sprite
    },
    {
        path:'/fabric',
        component:Fabric
    },
    {
        path:'*',
        redirect:'/fabric'
    },
]

const router = new VueRouter({
    mode:'history',
    routes
})

router.beforeEach((to,from,next)=>{
    if(to.matched.some(record=>record.meta.requireAuth)){
        next({
            path:'/login'
        })
    }else{
        next()
    }
})

export default router