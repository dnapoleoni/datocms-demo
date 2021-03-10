<template>
  <div v-if="data" v-touch:swipe="swipeHandler">
    <nav>
      <!-- prev project -->
      <button class="icon prev" :disabled="!(showNav && isPrev)" @click="nextPrevRecord(false)">
        <font-awesome-icon width="1em" height="1em" icon="angle-left" />
      </button>

      <!-- current/total -->
      <span>{{ index }}/{{ total }}</span>

      <!-- next project -->
      <button class="icon next" :disabled="!(showNav && isNext)" @click="nextPrevRecord(true)">
        <font-awesome-icon width="1em" height="1em" icon="angle-right" />
      </button>
    </nav>
    
    <!-- project content -->
    <main>
      <div v-if="projectExists">

        <!-- static first row -->
        <div class="row header">
          <h2>{{ data.project.title }}</h2>
          <a :href="data.project.url" target="_blank" title="View Project"><span>View</span></a>
        </div>

        <!-- dynamic content rows -->
        <div class="row" v-for="(item, index) in data.project.content" :key="index">
          <h3 class="project-heading" v-if="!!item.heading">{{ item.heading }}</h3>
          <p class="project-copy" v-if="!!item.copy" v-html="item.copy"></p>
          <datocms-image class="project-image" v-if="!!item.photo" :data="item.photo.image"/>
        </div>
      </div>

      <!-- error message -->
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
              content {
              ...on ProjectCopyRecord {
                id
                copy
              }
              ...on ProjectHeadingRecord {
                id
                heading
              }
              ...on ProjectImageRecord {
                id
                caption
                url
                photo {
                  image: responsiveImage(imgixParams: { fit: clip, crop: faces, auto: format }) {
                    ...imageFields
                  }
                }
              }
            }
          }
          _allProjectsMeta {
            count
          }
        }
        fragment imageFields on ResponsiveImage {
            srcSet
            webpSrcSet
            sizes
            src
            width
            height
            aspectRatio
            alt
            title
            bgColor
            base64
        }
        `
      });

      // check if exists
      this.projectExists = this.data.project != null;

      // if exists, set up nav values
      if (this.projectExists) {

        this.index = Number(this.data.project.position);
        this.total = Number(this.data._allProjectsMeta.count);
        this.showNav = true;

        // set page title
        document.title = "Project: " + this.data.project.title;
      }
    },

    // get next/previous slug
    async nextPrevRecord (direction) {

      // get index to look up
      let recordIndex = direction ? this.index + 1 : this.index - 1;

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
    },

    // swipe left/right to nav projects
    swipeHandler (direction) {
      console.log('Swipe:: ' + direction);
      if (direction == "left" && this.isNext) {
        this.nextPrevRecord (true) 
      } else if (direction == "right" && this.isPrev) {
        this.nextPrevRecord (false) 
      } 
    }
  },

  computed: {
    isNext() { return this.index < this.total },
    isPrev() { return this.index > 1}
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

    // content
    & > * {
      margin: 2rem auto;

      @media only screen and (max-width: $break-mobile) {
        margin: 0.6rem auto;
      }

      &.project-header {

      }

      &.project-copy {
        text-align:justify;
      }

      &.project-image {
        @media only screen and (min-width: $break-mobile) {
          max-width: 800px;
        }
      }
    }

    // first content row
    &.header {
      flex-direction: row;
      justify-content: space-between;
      align-items:center;

      @media only screen and (max-width: $break-mobile) {
        flex-direction: column;
      }
      
      // overwrite content margins
      & > * {
        margin: 1rem 0;
      }

      a {
        white-space: nowrap;

        // overwrite margin for mobile
        @media only screen and (max-width: $break-mobile) {
          margin: 0;
        }
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