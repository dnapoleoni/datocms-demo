<template>
      <header v-if="data">
        <div>
          <h1>{{ data.profile.name }}<br />{{ data.profile.profession }}</h1>
          <span>{{ data.profile.email }}</span>
        </div>
        <div>
          <datocms-image
            class="profile-pic"
            :data="data.profile.photo.image"
          />
        </div>
      </header>
</template>

<script>
import { request } from "@/lib/datocms";

export default {
  name: "Header",
  data() {
    return {
      data: null,
    };
  },
  async mounted() {
    this.data = await request({
      query: `
        {
          profile {
            name
            profession
            email
            photo {
              image: responsiveImage(imgixParams: { w: 300, h: 400, fit: crop, crop: faces, auto: format }) {
                ...imageFields
              }
            }
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
      `,
    });
  },
};
</script>

<style lang="scss">
    header {
        display:flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        border-bottom: $border-primary;
        padding-bottom: 1rem;
        flex-shrink: 0;

        /* mobile */
        @media only screen and (max-width: $break-mobile) {
            justify-content: start;
            flex-direction:column;
            text-align: center;
        }

        /* title */
        h1 {
            font-weight: 700;
            font-size: 4.5vmax;
            line-height: 5vmax;
            margin-top: 2rem;
        }

        /* subtitle */
        span {
            font-size: 1rem;
            color: $colour-secondary;
            font-family: $font-plain;
            font-weight: 400;
            
        }

        /* image */
        & > div {
            &:last-child {
                .profile-pic {
                    width: 20vw;
                    height: 20vw;
                    border: $border-faint;
                    border-radius: 50%;
                    max-height: 290px;
                    max-width: 290px;

                    @media only screen and (max-width: $break-mobile) {
                        width: auto;
                        height: auto;
                        margin-top: 2rem;
                    }
                }               
            }
        }
    }
</style>