<template>
      <header v-if="data">
        <div>
          <h1>{{ data.profile.name }}<br />{{ data.profile.profession }}</h1>
          <span>{{ data.profile.location }}</span>
        </div>
        <div>
          <datocms-image
            class="profile-pic"
            :data="data.profile.photo.image"
          />
        </div>
        <button v-if="!isHome" @click="$router.push('/home')">                  
          <font-awesome-icon icon="angle-left" />
          <span>Back</span></button>
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
  computed: {
  isHome() {
     return this.$route.name === 'home'
    }
  },
  async mounted() {
    this.data = await request({
      query: `
        {
          profile {
            name
            profession
            photo {
              image: responsiveImage(imgixParams: { w: 300, h: 400, fit: crop, crop: faces, auto: format }) {
                ...imageFields
              }
            }
            location
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
        padding-bottom: 1.6rem;
        flex-shrink: 0;
        position:relative;

        /* mobile */
        @media only screen and (max-width: $break-mobile) {
            justify-content: start;
            flex-direction:column;
            text-align: center;
        }

        /* subtitle */
        & > div {
          span {
              font-size: 1rem;
              color: $colour-secondary;
              font-family: $font-plain;
              font-weight: 400;
          }

          /* image */
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

        button {
          position:absolute;
          left: 0;
          bottom: -2rem;
          border: $border-primary !important;
          background-color: $colour-bg !important;
          color: $colour-primary !important;
          padding: 0.4rem 2rem;
          margin-bottom: 1rem;
          margin-left: 0.4rem;
          transition:0.3s;

          & > svg {
            margin-right: 0.2rem;
          }

          &:hover {
            border: $border-faint !important;
            background-color: $colour-primary !important;
            color: $colour-bg !important;
          }
        }
    }
</style>