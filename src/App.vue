<template>
    <div id="app">
        <section>
            <NavBar :data="data"></NavBar>
            <Header :data="data"></Header>
            <transition name="fade">
                <router-view ref="view"></router-view>
            </transition>
            <Footer ></Footer>
        </section>
    </div>
</template>

<script>

import NavBar from "@/components/NavBar.vue"
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"
import { request } from "@/lib/datocms";

export default {
    name: 'app',
    components: {
        NavBar,
        Header,
        Footer
    },
    data() {
        return {
            data: null
        }
    },
    methods: {
        getPageValues() {
            return {
                a: 1,
                b: 2
            }
        }
    },
    watch: {
        // update meta on route change
        '$route' (to) {
            document.title = to.meta.title
            // const sameTemplate = to.name == from.name;
            // const projectTop = 260;
            // const view = this.$refs.view;
            // const project = view.$refs.project;
            // const isProject = sameTemplate && project != undefined;
            // if (isProject) {
            //     const rect = project.getBoundingClientRect();
            //     if (rect.top < projectTop / 2) {
            //         window.scrollTo(0,projectTop);
            //     }
            // } else {
            //     window.scrollTo({
            //         top: 0,
            //         left: 0, 
            //         behaviour: 'smooth'
            //     });
            // }
        }
    },
//     watch:{
//     $route (to, from){
//       const content = this.$refs.content;
//       if (content) {
//         const rect = content.getBoundingClientRect();
//         const top = Math.ceil(rect.top);
//         console.log(to, from)
//         if (to.name == from.name) {
//           if (top < 130) {
//             window.scrollTo(0,260);
//           }
//         } else {
//           window.scrollTo(0,0);
//         }
//       }
//     }
//   },
    async mounted() {
        // welcome
        console.log(`
-------------------------
Welcome to the devtools!

Like 99% of dev portfolios this one's only ever
updated in a job-hunting hurry but if you're keen to
have a stalk around the codebase the repo is here:

https://github.com/dnapoleoni/datocms-demo

Also the site's been left in dev mode so you can
take a spin through the Vue Dev tools if you're
rocking Chrome: 

https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=en

(ignore the showImage logs, they're from the datocms library
and I can't kill them without killing this message!)

Hope to hear from you soon,
Dan
-------------------------
        `);

        this.data = await request({
        query: `
            {
                site: _site {
                    favicon: faviconMetaTags {
                    ...metaTagsFragment
                    }
                }
                profile {
                    seo: _seoMetaTags {
                    ...metaTagsFragment
                    }
                    name
                    profession
                    photo {
                        image: responsiveImage(imgixParams: { w: 300, h: 400, fit: crop, crop: faces, auto: format }) {
                            ...imageFields
                        }
                    }
                    location
                    emailAddress
                    phoneNumber
                }
            }

            fragment metaTagsFragment on Tag {
                attributes
                content
                tag
            }

            fragment imageFields on ResponsiveImage {
                srcSet
                webpSrcSet
                sizes
                src
                width
                height
                aspectRatio
                alt
                title
                bgColor
                base64
            }
        `,
        });
    }
}
</script>

<style lang="scss">
    @import '@/assets/app';
</style>
