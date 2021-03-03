<template>
    <article v-if="data">
        <h2>{{ data.title }}</h2>
        <div v-if="data.description" v-html="data.description"></div>
        <ul role="list" :class="{ 'stack-list' : data.stack }">
            <Entry v-for="entry in data.entries" :key="entry.id" :data="entry" :type="entry.__typename"/>
        </ul>
        <div v-if="!!this.$slots.default">
            <slot>
                <!-- inner content passed through here -->
            </slot>
        </div>
    </article>
</template>

<script>
import Entry from "@/components/Entry.vue"
export default {
    name: "Section",
    components: {
        Entry
    },
    props: {
        data: Object
    }
}
</script>

<style lang="scss">

    article {
        /* list */
        & > ul {
            display:flex;
            flex-wrap:wrap;
            position:relative;
            left: -20px;
            padding-bottom: 2px;

            /* mobile */
            @media only screen and (max-width: $break-mobile) {
                flex-direction:column;
                left: 0;

            }
            
            /* vertically stacking lists on desktop & mobile) */
            &.stack-list {
                flex-direction: column;
                left: 0;
            }
        }

        /* inner content */
        & > div {
            margin-top: 2rem;
        }
    }
    
</style>