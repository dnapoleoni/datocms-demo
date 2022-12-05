<template>
      <footer>
        <span>Powered by <a href="https://www.vuejs.org" target="_blank" tabindex="0">Vue.js,</a> <a href="https://www.datocms.com" target="_blank" tabindex="0">DatoCMS</a> and <a href="https://www.netlify.com" target="_blank" tabindex="0">Netlify</a></span>
      </footer>
</template>

<script>

export default {
  name: "Footer",
};
</script>

<style lang="scss" scoped>
  footer {
    
    text-align: center;
    flex-shrink: 0;
    padding: 1rem 0;
    margin-top: auto;

    & span {
      font-size: 0.65rem;
    }
  }
</style>