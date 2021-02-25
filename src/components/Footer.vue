<template>
      <footer>
        <span>Powered by <a href="https://www.vuejs.org" target="_blank">Vue.js,</a> <a href="https://www.datocms.com" target="_blank">DatoCMS</a> and <a href="https://www.netlify.com" target="_blank">Netlify</a></span>
      </footer>
</template>

<script>

export default {
  name: "Footer",
};
</script>

<style lang="scss">
  footer {
    font-size: 0.8rem;
    text-align: center;
    flex-shrink: 0;
    padding: 1rem 0;
  }
</style>