<template>
      <main v-if="data">
        here is a project
      </main> 
</template>

<script>
// import { request } from "@/lib/datocms";

export default {
  name: "Project",
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
  //         sizes
  //         src
  //         width
  //         height
  //         alt
  //         title
  //         base64
  //       }
  //     `,
  //   });
  // },
};
</script>

<style lang="scss">

</style>