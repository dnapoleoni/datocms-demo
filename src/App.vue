<template>
    <div id="app">
        <section>
            <Header />
            <router-view />
            <Footer />
        </section>
    </div>
</template>

<script>

import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"

export default {
    name: 'app',
    components: {
        Header,
        Footer
    },
    watch: {

        // update meta on route change
        '$route' (to) {
            document.title = to.meta.title
        }
    },
    mounted() {
        // this.init()
    },
    methods: {
        // init() {
            // this.$store.dispatch('device/detectDevice')
        // }
    }
}
</script>

<style lang="scss">
    @import '@/assets/app';
</style>
