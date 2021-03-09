<template>
  <div v-if="data">
    <nav>
      <!-- prev project -->
      <button class="icon prev" :disabled="!(showNav && this.index > 1)" @click="nextPrevRecord(false)">
        <font-awesome-icon width="1em" height="1em" icon="angle-left" />
      </button>

      <!-- current/total -->
      <span>{{ index }}/{{ total }}</span>

      <!-- next project -->
      <button class="icon next" :disabled="!(showNav && this.index < this.total)" @click="nextPrevRecord(true)">
        <font-awesome-icon width="1em" height="1em" icon="angle-right" />
      </button>
    </nav>
    
    <!-- project content -->
    <main>
      <div v-if="projectExists">
        <div class="row header">
          <h2>{{ this.data.project.title }}</h2>
          <a :href="data.project.url" target="_blank" title="View Project"><span>View</span></a>
        </div>
      </div>
      <div v-else>
        <p>Sorry, that project doesn't seem to exist. Are you sure you meant to visit <b>{{ this.$route.params.slug }}</b>?</p>
        <p>You can either double-check your spelling (we all typo, it's cool) or hit the 'back' button to head back to the homepage and click one of the links I prepared earlier.</p>
      </div>
    </main> 
  </div>
</template>

<script>
import { request } from "@/lib/datocms";

export default {
  name: "Project",
  data() {
    return {
      data: null,
      projectExists: Boolean,
      index: Number,
      total: Number,
      showNav: false,
      slug: String
    }
  },
  methods: {

    // call datocms & update values
    async getProjectRecord (slug) {

      // get datocms data
      this.data = await request({
        query: `{
          project(filter: { slug: { eq: "${ slug }"} }) {
            title
            position
            url
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
          _allProjectsMeta {
            count
          }
        }`
      });

      // check if exists
      this.projectExists = this.data.project != null;

      // if exists, set up nav values
      if (this.projectExists) {

        this.index = Number(this.data.project.position);
        this.total = Number(this.data._allProjectsMeta.count);
        this.showNav = true;
      }
    },

    // get next/previous slug
    async nextPrevRecord (isNext) {

      // get index to look up
      let recordIndex = isNext ? this.index + 1 : this.index - 1;

      // fetch it
      let req = await request({
        query: `{
          project(filter: { position: { eq: "${ recordIndex }"} }) {
            slug
          }
        }`
      });

      // push to router
      this.$router.push('/project/' + req.project.slug)
    }
  },

  // quick-fetch slug on project nav
  beforeRouteUpdate(to, from, next) {

    // check if different, just in case
    if (this.slug != to.params.slug) {

      // save new slug
      this.slug = to.params.slug;
      
      // nav to new record
      this.getProjectRecord(to.params.slug);
    } else {
      
      // show error
      this.projectExists = false;
    }

    next();
  },
  
  // on first mount of page
  async mounted() {

    // save current slug
    this.slug = this.$route.params.slug;
    
    // fetch record
    this.getProjectRecord(this.slug);
  },
};
</script>

<style lang="scss">
div {
  position:relative;

  // each content row
  &.row {

    display:flex;
    flex-direction: column;

    // first content row
    &.header {
      flex-direction: row;
      justify-content: space-between;
      align-items:center;

      @media only screen and (max-width: $break-mobile) {
        flex-direction: column;
      }

      a {
        white-space: nowrap;
      }
      
      h2 {
        margin: 1rem 0;
      }
    }
  }
  & > nav {
    position:absolute;
    width: 100%;
    top: -1.5rem;
    text-align:center;

    & > button {
      position:absolute;
      
      &.next {
        right: 0;
      }
      &.prev {
        left: 0;
      }

      &[disabled] {
        cursor:initial;
        & > svg {
          opacity: 0.2;
        }
      }
    }

    & > span {
      font-size:0.8rem;
      font-weight: 600;
      display:inline-block;
      background-color: $colour-bg !important;
      color: $colour-primary !important;
      padding: 0.8rem 1rem;
      letter-spacing: 0.1rem;
    }
  }
  & > main {
    p {
      padding-bottom: 1rem;
    }
  }
}
  
</style>