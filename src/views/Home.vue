<template>
      <main v-if="data">

          <!-- main content -->
          <Section v-for="section in data.page.sections" :key="section.id" :data="section" />

          <!-- form -->
          <article>
            <h2>Hit me up</h2>
            <Form />
          </article>
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
      query: `
       {
        page(filter: { title: { eq: "Home" } }) {
          title
          sections {
            id
            title
            stack
            entries {
              id
              title
              subtitle
              text
              url
              newWindow
              items{
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
      `,
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

          /* list */
          & > ul {
              display:flex;
              flex-wrap:wrap;
              margin-left: -20px;
              padding-bottom: 2px;

              /* mobile */
              @media only screen and (max-width: $break-mobile) {
                  flex-direction:column;
                  margin-left: 0;

              }

              /* row */
              & > li {
                  white-space: nowrap;
                  margin:0px 1rem 0.6rem 0;

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
              
              /* vertically stacking lists on desktop & mobile) */
              &.stack-list {
                  flex-direction: column;
                  margin-left: 0;

                  & > li {
                      white-space: initial;

                      &:before {
                          content: none;
                      }
                  }
              }
          }
      }
  }
</style>