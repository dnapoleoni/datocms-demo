<template>
    <div id="app">
        <section>
            <NavBar :data="data"></NavBar>
            <Header :data="data"></Header>
            <transition name="fade" mode="out-in">
                <router-view :key="$route.fullPath"></router-view>
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
