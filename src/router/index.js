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
            title: 'Daniel Napoleoni | Frontend Developer'
        },
        component: Home
    },
    {
        path: '/project/:slug',
        name: 'project',
        meta: {
            title: 'Project: loading...'
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
    routes,
    scrollBehavior(to, from) {
        
        // same page
        if (to.fullPath === from.fullPath) {
            return;
        }
        
        const obj = { x: 0, y: 0, behavior: 'smooth'}
        const sameTemplate = to.name == from.name;
        const view = document.getElementById('router-view-id');
        const nav = document.getElementById('nav-id');
        const header = document.getElementById('header-id');
        const isProject = sameTemplate && view != undefined;
        
        if (isProject) {

            // get heights
            const viewRect = view.getBoundingClientRect();
            const navRect = nav.getBoundingClientRect();
            const headerRect = header.getBoundingClientRect();

            // check if above/below
            const isAboveFold =  viewRect.top < navRect.bottom;
            
            // hey it's scrolled down past the title
            if (isAboveFold) {
                const scrollTargetY = headerRect.height - navRect.height;
                obj.y = scrollTargetY;
            }
        }

        return obj;
    }
})
