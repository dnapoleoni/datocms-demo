import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        meta: {
            title: 'Home'
        },
        component: () => import('../views/Home.vue')
    },
    {
        path: '/project/',
        name: 'project',
        meta: {
            title: 'Project'
        },
        component: () => import('../views/Project.vue')
    },
    {
        path: '*',
        redirect: {
            name: 'home'
        }
    }
]

export default new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
