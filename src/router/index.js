import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Project from '@/views/Project.vue'
import FormSuccess from '@/views/FormSuccess.vue'
import FormFailure from '@/views/FormFailure.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        meta: {
            title: 'Home'
        },
        component: Home
    },
    {
        path: '/project/',
        name: 'project',
        meta: {
            title: 'Project'
        },
        component: Project
    },
    {
        path: '/cheers',
        name: 'success',
        component: FormSuccess
    },
    {
        path: '/uh-oh',
        name: 'failure',
        component: FormFailure
    },
    {
        path: '*',
        redirect: {
            name: 'home'
        },
    },
]

export default new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
