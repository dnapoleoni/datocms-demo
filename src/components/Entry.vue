<template>
     <li role="listitem" v-if="data">
        <span>
            <span v-if="data.title"><b>{{ data.title }}<span v-if="data.subtitle"> ({{data.subtitle}})</span></b>: </span>
            <span v-if="data.text && data.url"><a :href="data.url" :target="data.newWindow ? '_blank' : '_self'">{{ data.text }}</a></span>
            <Item v-for="(item, index) in data.items" :key="item.id" :data="item" :index="index" :max="data.items.length - 1"/>
            <p v-if="data.description">{{ data.description }}</p>
        </span>
    </li>
</template>

<script>
import Item from "@/components/Item.vue"
export default {
    name: "Entry",
    components: {
        Item
    },
    props: {
        data: Object,
        stacked: Boolean
    }
}
</script>

<style lang="scss">
    li {
        white-space: nowrap;
        margin: 0px 1rem 0.6rem 0;

        & > p {
            margin: 0.4rem 0 0.6rem;
        }

        /* mobile */
        @media only screen and (max-width: $break-mobile) {
            white-space: initial;
        }

        /* separators on desktop */
        @media only screen and (min-width: $break-mobile) {
            &:before {
                content: "";
                display:inline-block;
                width: 5px;
                height: 5px;
                background-color: $colour-secondary;
                border-radius: 5px;
                margin: 2px 15px 2px 0;
            }
        }
    }

    /* stacked items */
    .stack-list li {
        white-space: initial;

        &:before {
            content: none;
        }
    }
</style>