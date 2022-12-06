<template>
    <div id="app">
        <section>
            <Header />
            <transition name="fade">
                <router-view />
            </transition>
            <Footer />
        </section>
    </div>
</template>

<script>

import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"
import { request } from "@/lib/datocms";

export default {
    name: 'app',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            data: null
        }
    },
    watch: {
        // update meta on route change
        '$route' (to) {
            document.title = to.meta.title
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
                }
            }

            fragment metaTagsFragment on Tag {
                attributes
                content
                tag
            }
        `,
        });
    }
}
</script>

<style lang="scss">
    @import '@/assets/app';
</style>
