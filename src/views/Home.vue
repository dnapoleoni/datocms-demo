<template>
      <main>
      <!-- <main v-if="data"> -->
          <article>
            <h2>Stuff I'm good at</h2>
            <ul role="list">
              <li role="listitem">
                <span><b>core</b>: HTML / CSS / JS / ES6 / Node</span>
              </li>
              <li role="listitem">
                <span><b>libraries</b>: Vue.js / GSAP / jQuery / Handlebars</span>
              </li>
              <li role="listitem">
                <span><b>BAU</b>: Dynamic Banners / eDMs / Microsites</span>
              </li>
              <li role="listitem">
                <span><b>dev ops</b>: Gulp / NPM / AWS S3 / CI/CD (Buddy)</span>
              </li>
              <li role="listitem">
                <span><b>voice</b>: Alexa &amp; Google (VoiceFlow)</span>
              </li>
              <li role="listitem">
                <span><b>testing</b>: Browserstack / Litmus</span>
              </li>
            </ul>
          </article>

          <article>
            <h2>Places I've worked</h2>
            <ul role="list" class="stack-list">

              <li role="listitem">
                <span><b>2019 - now</b>: <a href="https://www.clemenger.com.au" target="_blank">Clemenger BBDO</a> | Myer / BMW / Belong / NAB / MLC / TAC</span>
              </li>
              <li role="listitem">
                <span><b>2019 (freelance)</b>: <a href="https://www.cumminsandpartners.com" target="_blank">Cummins &amp; Partners</a> | Specsavers</span>
              </li>
              <li role="listitem">
                <span><b>2019 (freelance)</b>: <a href="https://www.trout.com.au" target="_blank">Trout</a> | Reece</span>
              </li>
              <li role="listitem">
                <span><b>2018 (freelance)</b>: <a href="https://www.theroyals.com.au" target="_blank">The Royals</a> | Google / AusSuper / Athena / Spotify</span>
              </li>
              <li role="listitem">
                <span><b>2009 - 2017</b>: <a href="https://www.isobar.com/en-au" target="_blank">Isobar Australia</a> | Holden / AusPost / Jetstar / Porter Davis / DFR / Smiggle / Save The Children / SEEK</span>
              </li>
              <li role="listitem">
                <span><b>2007 - 2008</b>: <a href="https://www.cer8ive.com.au" target="_blank">Cre8ive</a> | NADC / The Mint / FM104.7</span>
              </li>
            </ul>
          </article>

          <article>
            <h2>Things I did</h2>
            <ul role="list" class="stack-list">
              <li role="listitem">
                <span><b>Microsite build</b>: <a href="https://findmyfinance.bmw.com.au" target="_blank">BMW Finance Finder</a> | Vue.js / SCSS / S3 / SES / Buddy</span>
                <p>Interactive survey featuring modular questions, a dynamically-generated results page, dealer location searching and dynamically generated emails sent to both customer and dealerships.</p>
              </li>
              <li role="listitem">
                <span><b>Microsite update</b>: <a href="https://fashionsonyourfrontlawn.com.au" target="_blank">Fashions on the Field</a> | Vue.js / SCSS / S3</span>
                <p>Complete reskin of the 2019 FotF microsite included added features and reconfigured code. Has since undergone another reskin, but the bulk of the new build remains the same.</p>
              </li>
            </ul>
          </article>

          <!-- form -->
          <article>
            <h2>Hit me up</h2>
            <Form />
          </article>

          <article>
            <h2>Real me, no filter</h2>
            <ul role="list">
              <li role="listitem">
                <span><a href="https://www.facebook.com/dnapoleoni" target="_blank">Facebook</a></span>
              </li>
              <li role="listitem">
                <span><a href="https://www.twitter.com/onefatman" target="_blank">Twitter</a></span>
              </li>
              <li role="listitem">
                <span><a href="https://www.instagram.com/danielnapoleoni/" target="_blank">Instagram</a></span>
              </li>
              <li role="listitem">
                <span><a href="https://www.linkedin.com/in/daniel-napoleoni/" target="_blank">LinkedIn</a></span>
              </li>
            </ul>
          </article>
      </main>
</template>

<script>
// import { request } from "@/lib/datocms";
import Form from "@/components/Form.vue"

export default {
  name: "Home",
  components: {
    Form
  },
  data() {
    return {
      data: null,
    };
  },
  // async mounted() {
  //   this.data = await request({
  //     query: `
  //       {
  //         site: _site {
  //           favicon: faviconMetaTags {
  //             ...metaTagsFragment
  //           }
  //         }
  //         profile {
  //           seo: _seoMetaTags {
  //             ...metaTagsFragment
  //           }
  //           name
  //           description
  //           profession
  //           location
  //           email
  //           coordinates {
  //             latitude
  //             longitude
  //           }
  //           photo {
  //             desktopImage: responsiveImage(imgixParams: { w: 300, h: 400, fit: crop, crop: faces, auto: format }) {
  //               ...imageFields
  //             }
  //             mobileImage: responsiveImage(imgixParams: { w: 192, h: 192, fit: crop, crop: faces, auto: format }) {
  //               ...imageFields
  //             }
  //           }
  //         }
  //         theme {
  //           color
  //           backgroundImage {
  //             url(imgixParams: { w: 1440, auto: format })
  //             responsiveImage(imgixParams: { w: 1440, auto: format }) {
  //               base64
  //             }
  //           }
  //         }
  //         socials: allSocials {
  //           social
  //           url
  //         }
  //       }

  //       fragment metaTagsFragment on Tag {
  //         attributes
  //         content
  //         tag
  //       }
  //       fragment imageFields on ResponsiveImage {
  //         srcSet
  //         webpSrcSet
  //         sizes
  //         src
  //         width
  //         height
  //         aspectRatio
  //         alt
  //         title
  //         bgColor
  //         base64
  //       }
  //     `,
  //   });
  // },
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