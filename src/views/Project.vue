<template>
    <main v-if="data">
      <div v-if="projectExists">
        <h2>{{ this.data.project.title }}</h2>
        <!-- <p>{{ data.client.name }}</p> -->
      </div>
      <div v-else>
        <p>Sorry, that project doesn't seem to exist. Are you sure you meant to visit <b>{{ this.$route.params.slug }}</b>?</p>
        <p>You can either double-check your spelling (we all typo, it's cool) or hit the 'back' button to head back to the homepage and click one of the links I prepared earlier.</p>
      </div>
    </main> 
</template>

<script>
import { request } from "@/lib/datocms";

export default {
  name: "Project",
  data() {
    return {
      data: null,
      projectExists: Boolean
    };
  },
  async mounted() {
    this.data = await request({
      query: `{
        project(filter: { slug: { eq: "${ this.$route.params.slug}" } }) {
          title
          client {
            id
            name
          }
          skills {
            id
            name
          }
          description
        }
      }`
    });

    this.projectExists = this.data.project != null;
  },
};
</script>

<style lang="scss">
  p {
    padding-bottom: 1rem;
  }
</style>