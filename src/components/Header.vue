<template>
      <header v-if="data">
      
        <!-- title -->
        <div>
          <h1>{{ data.profile.name }}<br />{{ data.profile.profession }}</h1>
          <Transition name="fade" mode="out-in">
            <p key="email" v-if="isEmail">Email me at <a :href="`mailto:${data.profile.emailAddress}`">{{ data.profile.emailAddress }}</a></p>
            <p key="telephone" v-else-if="isTel">Call me on <a :href="`tel:${data.profile.phoneNumber}`">{{ data.profile.phoneNumber }}</a></p>
            <p key="location" v-else>{{ data.profile.location }}</p>
          </Transition>
        </div>

        <!-- picture -->
        <div>
          <datocms-image
            class="profile-pic"
            :data="data.profile.photo.image"
          />
        </div>

        
      </header>
</template>

<script>
// import { request } from "@/lib/datocms";

export default {
  name: "Header",
  data() {
    return {
      // data: null,
      isEmail: false,
      isTel: false
    };
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    isHome() {
     return this.$route.name === 'home'
    }
  },
  methods: {
    displayEmail () {
      this.isEmail = !this.isEmail;
      this.isTel = false;
    },
    displayTel () {
      this.isTel = !this.isTel;
      this.isEmail = false;
    }
  },
  // async mounted() {
  //   this.data = await request({
  //     query: `
  //       {
  //         profile {
  //           name
  //           profession
  //           photo {
  //             image: responsiveImage(imgixParams: { w: 300, h: 400, fit: crop, crop: faces, auto: format }) {
  //               ...imageFields
  //             }
  //           }
  //           location
  //           emailAddress
  //           phoneNumber
  //         }
  //       }
  //       fragment imageFields on ResponsiveImage {
  //           srcSet
  //           webpSrcSet
  //           sizes
  //           src
  //           width
  //           height
  //           aspectRatio
  //           alt
  //           title
  //           bgColor
  //           base64
  //       }
  //     `,
  //   });
  // },
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
      margin-top:2rem;
      flex-shrink: 0;
      position:relative;

      /* mobile */
      @media only screen and (max-width: $break-mobile) {
          justify-content: start;
          flex-direction:column;
          text-align: center;
          margin-top:1rem;
      }

      /* subtitle */
      & > div {
        p {
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
      
      /* home */
      .icons {
        position:sticky;
        z-index: 10;
        top: 2rem;
        left: -1rem;

        .icon {
          padding-left: 0.5rem;
          padding-right: 0.5rem;

          &.selected {
            color: orangered;
          }

          &.disabled {
            pointer-events: none;
            opacity: 0.1;
          }
        }
      }

      // fades
      .fade-enter-active,
      .fade-leave-active {
        transition: opacity 0.2s ease;
      }

      .fade-enter-from,
      .fade-leave-to {
        opacity: 0;
      }
    }
</style>