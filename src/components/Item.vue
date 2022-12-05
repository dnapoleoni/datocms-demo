<template>
    <span>
        <span v-if="index == 0"> |</span>&nbsp;
        <span :class="`${ data.strike && 'strike'} ${ !!data.tooltip && 'tooltip'}`" :title="data.tooltip">{{ data.name }}</span>&nbsp;
        <span v-if="index < max"> /</span>&nbsp;
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

<style lang="scss">
    .strike {
        text-decoration: line-through;
    }
    .tooltip {
        cursor: pointer;
    }
</style>