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

// const isAboveFold = (element) => {

//     // hard-coded offsets based on current layout 
//     // could calculate this but it's ship-it time
//     const footerHeight = 57;
//     const offsetHeight = 187;

//     // get heights
//     const rect = element.getBoundingClientRect();
//     const doc = document.body.getBoundingClientRect();
//     const headerHeight = doc.height - rect.height;
    
//     // calculate offset
//     const zero = Math.abs(Math.round(rect.top - headerHeight + footerHeight));
    
//     // check if above/below
//     return headerHeight - zero < offsetHeight;
// }

export default new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior(to, from) {
        const app = this.app.$el.__vue__;
        const view = app.$refs.view;
        const sameTemplate = to.name == from.name;
        const project = view?.$refs?.project;
        const isProject = sameTemplate && project != undefined;
        
        if (isProject) {
        // hard-coded offsets based on current layout 
        // could calculate this but it's ship-it time
        const footerHeight = 57;
        const offsetHeight = 187;

        // get heights
        const rect = project.getBoundingClientRect();
        const doc = document.body.getBoundingClientRect();
        const headerHeight = doc.height - rect.height;
        
        // calculate offset
        const zero = Math.abs(Math.round(rect.top - headerHeight + footerHeight));

        // check if above/below
        const isAboveFold =  headerHeight - zero < offsetHeight;
        
        // hey it's scrolled down past the title
        if (isAboveFold) {

            // let's scroll it back up
            window.scrollTo({
                top: headerHeight - offsetHeight,
                left: 0, 
                behavior: 'smooth'
            });
        }
        } else {
            window.scrollTo({
                top: 0,
                left: 0, 
                behavior: 'smooth'
            });
        }
    }
})
