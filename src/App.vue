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
