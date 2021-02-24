<template>
  <div v-if="data">
    <section>
      <header>
        <div>
          <h1>{{ data.profile.name }}<br />{{ data.profile.profession }}</h1>
          <!-- <span>dnapoleoni&#64;gmail&#46;com</span> -->
        </div>
        <div>
          <datocms-image
            class="profile-pic"
            :data="data.profile.photo.desktopImage"
          />
        </div>
      </header>
      <main>
        <article>
          <h2>Skills</h2>
          <div><p>Stuff that I'm good at</p></div>
          <ul role="list">

            <li role="listitem"><span><b>core</b>: HTML / CSS / JS / ES6 / Node.js</span></li>
            <li role="listitem"><span><b>libraries</b>: Vue.js / GSAP / jQuery / Handlebars</span></li>
            <li role="listitem"><span><b>dev ops</b>: gulp / npm / aws S3 / CI/CD (Buddy)</span></li>
            <li role="listitem"><span><b>BAU</b>: Dynamic HTML5 Banners / eDMs / microsites</span></li>
            <li role="listitem"><span><b>voice</b>: Alexa &amp; Google (VoiceFlow)</span></li>
            <li role="listitem"><span><b>testing</b>: Browserstack / Litmus</span></li>
          </ul>
        </article>

        <article>
          <h2>Social</h2>
          <div><p>Check out the real me, no filter</p></div>
          <ul role="list">
            <li role="listitem">
              <a href="https://www.facebook.com/dnapoleoni" target="_blank"
                >Facebook</a
              >
            </li>
            <li role="listitem">
              <a href="https://www.twitter.com/onefatman" target="_blank"
                >Twitter</a
              >
            </li>
            <li role="listitem">
              <a
                href="https://www.instagram.com/danielnapoleoni/"
                target="_blank"
                >Instagram</a
              >
            </li>
            <li role="listitem">
              <a
                href="https://www.linkedin.com/in/daniel-napoleoni/"
                target="_blank"
                >LinkedIn</a
              >
            </li>
          </ul>
        </article>
      </main>
      <footer></footer>
    </section>

    <!-- not in section -->
    <!-- <datocms-image
        class="profile-pic"
        :data="data.profile.photo.desktopImage"
      /> -->
  </div>
</template>

<script>
import { request } from "./lib/datocms";
import { toHead } from "vue-datocms";

export default {
  name: "App",
  data() {
    return {
      nightMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
      data: null,
    };
  },
  methods: {
    toggleDayNight() {
      this.nightMode = !this.nightMode;
    },
  },
  metaInfo() {
    if (!this || !this.data) {
      return;
    }
    return toHead(this.data.profile.seo, this.data.site.favicon);
  },
  async mounted() {
    this.data = await request({
      query: `
        {
          site: _site {
            favicon: faviconMetaTags {
              ...metaTagsFragment
            }
          }
          profile {
            seo: _seoMetaTags {
              ...metaTagsFragment
            }
            name
            description
            profession
            location
            email
            coordinates {
              latitude
              longitude
            }
            photo {
              desktopImage: responsiveImage(imgixParams: { w: 300, h: 400, fit: crop, crop: faces, auto: format }) {
                ...imageFields
              }
              mobileImage: responsiveImage(imgixParams: { w: 192, h: 192, fit: crop, crop: faces, auto: format }) {
                ...imageFields
              }
            }
          }
          theme {
            color
            backgroundImage {
              url(imgixParams: { w: 1440, auto: format })
              responsiveImage(imgixParams: { w: 1440, auto: format }) {
                base64
              }
            }
          }
          socials: allSocials {
            social
            url
          }
        }

        fragment metaTagsFragment on Tag {
          attributes
          content
          tag
        }
        fragment imageFields on ResponsiveImage {
          srcSet
          sizes
          src
          width
          height
          alt
          title
          base64
        }
      `,
    });
  },
};
</script>

<style lang="scss">
@import "assets/demo";
</style>