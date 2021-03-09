<template>
     <li role="listitem" v-if="data">
        <span>
            <span v-if="computedData.title"><b>{{ computedData.title }}<span v-if="computedData.subtitle"> ({{computedData.subtitle}})</span></b>: </span>
            <span v-if="computedData.text && computedData.url">
                <router-link tabindex="0" v-if="!isEntry" :to="computedData.url">{{ computedData.text }}</router-link>
                <a tabindex="0" v-if="isEntry" :href="computedData.url" :target="computedData.newWindow ? '_blank' : '_self'">{{ computedData.text }}</a>
            </span>
            <Item v-for="(item, index) in computedData.items" :key="item.id" :data="item" :index="index" :max="computedData.items.length - 1"/>
            <p v-if="computedData.description">{{ computedData.description }}</p>
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
        type: String
    },
    computed: {
        isEntry: function() {
            return this.type == "EntryRecord"
        },
        computedData: function () {
            return {
                description: this.data.description,
                subtitle: this.isEntry ? this.data.subtitle : this.data.client.name,
                title: this.isEntry ? this.data.title : this.data.projectType,
                text: this.isEntry ? this.data.text : this.data.title,
                url: this.isEntry ? this.data.url : "/project/" + this.data.slug,
                newWindow: this.isEntry ? this.data.newWindow : false,
                items: this.isEntry ? this.data.items : this.data.skills
            }
        }
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