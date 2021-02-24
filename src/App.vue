<template>
  <div v-if="data">
    <section>
      <header>
        <div>
          <h1>{{ data.profile.name }}<br />{{ data.profile.profession }}</h1>
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
          <div role="list">
            <div role="listitem"><span>HTML / CSS / JS / ES6</span></div>
            <div role="listitem">
              <span
                ><a href="https://greensock.com/gsap/" target="_blank">GSAP</a>
                / <a href="https://jquery.com" target="_blank">jQuery</a> /
                <a href="https://handlebarsjs.com" target="_blank">Handlebars</a></span
              >
            </div>
            <div role="listitem">
              <span
                ><a href="https://vuejs.org" target="_blank">Vue.js</a> /
                <a href="https://gulpjs.com" target="_blank">Gulp</a> /
                <a href="https://nodejs.org/en/" target="_blank">Node</a> /
                <a href="https://www.npmjs.com" target="_blank">NPM</a></span
              >
            </div>
            <div role="listitem">
              <span
                >Dynamic HTML5 Banners +(<a href="https://webdesigner.withgoogle.com" target="_blank">GWD</a>,
                <a href="https://www.adobe.com/au/products/animate.html" target="_blank">Animate</a>,
                <a href="https://displayvideo.google.com" target="_blank">DV360</a>)</span
              >
            </div>
            <div role="listitem">
              <span
                >eDMs +(Template builds,
                <a href="https://www.salesforce.com/au/products/marketing-cloud/overview/" target="_blank">Salesforce</a>)</span
              >
            </div>
            <div role="listitem">
              <span
                >Microsite builds, some CI/CD (<a href="https://buddy.works" target="_blank"
                  >Buddy</a
                >), AWS (<a href="https://aws.amazon.com/s3" target="_blank">S3</a>)</span
              >
            </div>
            <div role="listitem">
              <span
                ><a href="https://www.atlassian.com/software/jira" target="_blank">JIRA</a>, Version Control (<a
                  href="https://www.atlassian.com/software/sourcetree"
                  target="_blank"
                  >Sourcetree</a
                >), <a href="https://www.atlassian.com/software/confluence" target="_blank">Confluence</a></span
              >
            </div>
            <div role="listitem">
              <span
                >Asset exporting &amp; optimisation (<a href="https://www.sketch.com" target="_blank"
                  >Sketch</a
                >, <a href="https://www.adobe.com/au/products/photoshop.html" target="_blank">Photoshop</a>)</span
              >
            </div>
            <div role="listitem">
              <span
                >Alexa/Google Voice dev (<a href="https://www.voiceflow.com" target="_blank">VoiceFlow</a
                >)</span
              >
            </div>
            <div role="listitem">
              <span
                >Browser & eDM testing (<a href="https://www.browserstack.com" target="_blank"
                  >Browserstack</a
                >, <a href="https://www.litmus.com" target="_blank">Litmus</a>,
                <a href="https://www.emailonacid.com" target="_blank">EoA</a>)</span
              >
            </div>
          </div>
        </article>

        <article>
          <h2>Social</h2>
          <div role="list">
            <div role="listitem">
              <a href="https://www.facebook.com/dnapoleoni" target="_blank"
                >Facebook</a
              >
            </div>
            <div role="listitem">
              <a href="https://www.twitter.com/onefatman" target="_blank"
                >Twitter</a
              >
            </div>
            <div role="listitem">
              <a
                href="https://www.instagram.com/danielnapoleoni/"
                target="_blank"
                >Instagram</a
              >
            </div>
            <div role="listitem">
              <a
                href="https://www.linkedin.com/in/daniel-napoleoni/"
                target="_blank"
                >LinkedIn</a
              >
            </div>
          </div>
        </article>
      </main>
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
              desktopImage: responsiveImage(imgixParams: { w: 720, h: 1080, fit: crop, crop: faces, auto: format }) {
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