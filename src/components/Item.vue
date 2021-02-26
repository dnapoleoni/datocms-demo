<template>
    <span>
        <span v-if="index == 0"> |</span> {{ data.name }} <span v-if="index < max"> /</span>
    </span>
</template>

<script>
export default {
    name: "Item",
    props: {
        data: Object,
        index: Number,
        max: Number
    }
}
</script>