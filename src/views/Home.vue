<template>
      <main v-if="data">

          <!-- main content -->
          <Section v-for="section in data.page.sections" :key="section.id" :data="section">

            <!-- pass form component to slot of hmu section -->
            <Form v-if="section.title == 'Hit me up'"/>

          </Section>
      </main>
</template>

<script>
import { request } from "@/lib/datocms";
import Form from "@/components/Form.vue"
import Section from "@/components/Section.vue"

export default {
  name: "Home",
  components: {
    Form,
    Section
  },
  data() {
    return {
      data: null,
    };
  },
  async mounted() {
    this.data = await request({
      query: `{
        page(filter: {title: {eq: "Home"}}) {
          title
          sections {
            id
            title
            description
            stack
            entries {
              __typename
              ... on EntryRecord {
                id
                title
                subtitle
                text
                url
                newWindow
                items {
                  id
                  name
                  url
                  newWindow
                }
                description
              }
              ... on ProjectRecord {
                id
                title
                slug
                projectType
                skills {
                  id
                  name
                  url
                  newWindow
                }
                client {
                  id
                  name
                  url
                  newWindow
                }
                description
              }
            }
          }
        }
      }`,
    });
  }
};
</script>

<style lang="scss">
  main {
    display:block;
    height: auto;
    width: auto;
    padding: 2rem 0 0;
    font-family: $font-plain;
    flex-grow: 1;

    /* each section */
    article {
      overflow:hidden;
      margin-bottom: 2rem;
      
      /* title */
      h2 {
        font-weight: 500;
        font-size: 1.8rem;
        font-family: $font-plain;
        margin: 1rem 0 2rem;
      }

      /* description */
      & > div {
        margin-bottom: 0rem;

        & > p {
          margin-bottom: 1.5rem;
        }
      }
    }
  }
</style>