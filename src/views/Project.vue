<template>
  <div v-if="data" v-touch:swipe="swipeHandler">
    <nav aria-label="Project navigation" v-if="projectExists">
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

    <nav aria-label="Navigation error message" v-else>
    <!-- <nav aria-label="Project navigation" v-if="projectExists"> -->
      <!-- prev project -->
      <span class="errormoji prev">⚠️</span>

      <!-- errorz -->
      <span>o h 🤖 n o</span>

      <!-- emojis -->
      <span class="errormoji next">⚠️</span>
    </nav>
    <!-- project content -->
    <main>
      <div ref="project" v-if="projectExists">

        <!-- static first row -->
        <div class="row header">
          <h2>{{ data.project.title }}</h2>
          <a v-if="data.project.linkExists" :href="data.project.url" target="_blank" title="View Project"><span>View</span></a>
          <!-- <a disabled tabIndex="-1" class="no-link" href="#" title="This project is no longer online" v-else>View</a> -->
        </div>

        <!-- dynamic content rows -->
        <div class="row" v-for="(item, index) in data.project.content" :key="index">
          <h3 class="project-heading" v-if="!!item.heading">{{ item.heading }}</h3>
          <p class="project-copy" v-if="!!item.copy" v-html="item.copy"></p>
          <datocms-image class="project-image" v-if="!!item.photo" :data="item.photo.image"/>
          <span class="project-image-caption" v-if="item.caption">{{ item.caption }}</span>
        </div>
      </div>

      <!-- error message -->
      <div v-else>
        <p>Uh-oes! Soooooo according to our records that project doesn't seem to actually exist.</p>
        
        <!-- close enough to a page we can redirect them there -->
        <p v-if="isGuess">I think maybe you were aiming for <router-link :to="('/project/' + this.bestMatch.target)">{{ this.bestMatch.target }}</router-link>? 🤷</p>
        <p v-if="isGuess">I reckon give that link a good ol' click, otherwise there's no shame in heading back to the <router-link :to="'/'">homepage</router-link> to check out the projects listed there.</p>
        
        <!-- no clue - end of the road, bud -->
        <p v-if="!isGuess">I can't even guess what page you were trying to reach - let's just chalk this one up to gremlins in the system!</p>
        <p v-if="!isGuess">If you're stuck, I'd suggest heading on back to the <router-link :to="'/'">homepage</router-link> and clicking one of the links I prepared earlier.</p>
      </div>
    </main> 

    <!-- loading modal -->
    <!-- <div v-if="loading" class="loading"></div> -->
  </div>
</template>

<script>
import { request } from "@/lib/datocms";
// import { Vue } from "vue";
import { findBestMatch } from "string-similarity";

export default {
  name: "Project",
  data() {
    return {
      data: null,
      projectExists: Boolean,
      index: Number,
      total: Number,
      showNav: false,
      slug: String,
      bestMatch: Object,
      matchFloor: 0.3,
      loading: true
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
            linkExists
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
          allProjects {
            slug
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
      } else {
        const slugs = this.data.allProjects.map(p => p.slug);
        this.bestMatch = findBestMatch(this.slug, slugs).bestMatch;
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
      if (direction == "left" && this.isNext) {
        this.nextPrevRecord (true) 
      } else if (direction == "right" && this.isPrev) {
        this.nextPrevRecord (false) 
      } 
    },

    // link to the autocorrected slug
   goToBestMatch() {

    this.$router.push('/project/' + this.bestMatch)
   }
  },

  computed: {
    isNext() { return this.index < this.total },
    isPrev() { return this.index > 1},
    isGuess() { return this.bestMatch.rating > this.matchFloor }
  },

  // quick-fetch slug on project nav
  async beforeRouteEnter(to, from, next) {

    next(async vm => {

      if (to.name == 'project') {
        // this.loading = true;

        // check if different, just in case
        if (to.name == 'project' && from.params.slug != to.params.slug) {

          // save new slug
          vm.slug = to.params.slug;

          // nav to new record
          await vm.getProjectRecord(to.params.slug);
          } else {

          // show error
          vm.projectExists = false;
        }
      } 
    });
  },
  
  // on first mount of page
  async mounted() {

    // save current slug
    this.slug = this.$route.params.slug;

    
    // fetch record
    await this.getProjectRecord(this.slug);
    
  },
};
</script>

<style lang="scss" scoped>
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

      &.project-copy {
        text-align:justify;
      }

      &.project-image {
        border-radius: 4px;
        @media only screen and (min-width: $break-mobile) {
          max-width: 800px;
        }
      }

      &.project-image-caption {
        margin-top: 0;
        margin-bottom: 0;
        font-size:smaller;
      }
    }

    // first content row
    &.header {
      flex-direction: row;
      justify-content: space-between;
      align-items:center;

      // testing sticky title
      // position: sticky;
      // top: 6rem;
      // background-color: snow;
      // z-index: 900;
      // padding: 1rem 0;
      // border-bottom: 1px dashed grey;

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

        &.no-link {
          text-decoration: line-through;
          pointer-events: none;
        }
      }
    }
  }
  & > nav {
    // position:absolute;
    width: 100%;
    // top: 0;
    text-align:center;
    position: sticky;
      z-index: 999;
      top: 3rem;
      background-color:snow;
      border-bottom: 1px dashed grey;
    
    // stick to top dashed line on mobile
    // @media only screen and (max-width: $break-mobile) {
    //   top:0;
      
    // }
    & > button,
    & > span.errormoji {
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
    min-height: 100%;
    p {
      padding-bottom: 1rem;

      &:last-child {
        padding-bottom: 0;
      }
    }
  }

  // .loading {
  //   position:absolute;
  //   left: 0;
  //   top: 0;
  //   right: 0;
  //   bottom: 0;
  //   background-color: rgba(255,255,255,0.8);
  //   margin-top:10px;
  //   pointer-events: none;
  //   z-index: 99999;
  // }
}
  
</style>