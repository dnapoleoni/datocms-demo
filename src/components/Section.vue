<template>
    <article v-if="data">
        <h2>{{ data.title }}</h2>
        <ul role="list" :class="{ 'stack-list' : data.stack }">
            <Entry v-for="entry in data.entries" :key="entry.id" :data="entry" />
        </ul>
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