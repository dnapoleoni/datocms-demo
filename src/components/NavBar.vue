<template>
      <nav aria-label="Site navigation">
        <div class="icons">
          <!-- home button -->
          <button class="icon" @click="$router.push('/home')" :class="isHome && 'disabled'" :tabindex="isHome && -1"> 
            <font-awesome-icon width="1em" height="1em" icon="home"/>
          </button>

          
          <!-- email button -->
          <button class="icon" @click="displayEmail" :class="isEmail && 'selected'"> 
            <font-awesome-icon width="1em" height="1em" icon="envelope"/>
          </button>
          
          <!-- phone button -->
          <button class="icon" @click="displayTel" :class="isTel && 'selected'"> 
            <font-awesome-icon width="1em" height="1em" icon="phone"/>
          </button>
        </div>
        <div class="info">
          <Transition name="fade" mode="out-in">
            <p key="email" v-if="isEmail"><a :href="`mailto:${data.profile.emailAddress}`">{{ data.profile.emailAddress }}</a></p>
            <p key="telephone" v-else-if="isTel"><a :href="`tel:${data.profile.phoneNumber}`">{{ data.profile.phoneNumber }}</a></p>
          </Transition>
        </div>
      </nav>
</template>

<script>
// import { request } from "@/lib/datocms";

export default {
  name: "NavBar",
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
  }
};
</script>

<style lang="scss" scoped>
    nav {
      display:flex;
      flex-direction: row;
      position:fixed;
      top:0;
      align-items: center;
      position:sticky;
      z-index: 10;
      top: 0;
      left: 0;
      background-color:snow;
      border-bottom:1px dashed grey;
      
      @media only screen and (max-width: $break-mobile) {
        justify-content: space-between;
      }
      
      /* home */
      .icons {
        margin-right:1rem;

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

      .info {
        p {
            font-size: 14px;
            color: $colour-secondary;
            font-family: $font-plain;
            font-weight: 400;
        }
      }
    }
</style>