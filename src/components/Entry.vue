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
        data: Object
    }
}
</script>