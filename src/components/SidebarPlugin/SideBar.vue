<template>
  <div
    class="sidebar"
    :data-color="activeColor"
    :data-image="backgroundImage"
    :style="sidebarStyle"
  >
    <div class="logo">
      <router-link to="/" class="simple-text logo-mini">
        <div class="logo-img">
          <img :src="imgLogo" alt="" />
        </div>
      </router-link>

      <router-link
        to="/"
        class="simple-text logo-normal"
      >
        {{ title }}
      </router-link>
    </div>
    <div class="sidebar-wrapper">
      <slot name="content"></slot>
      <md-list class="nav">
        <!--By default vue-router adds an active class to each route link. This way the links are colored when clicked-->
        <slot>
          <sidebar-link
            v-for="(link, index) in sidebarLinks"
            :key="link.name + index"
            :to="link.path"
            :link="link"
          >
          </sidebar-link>
        </slot>
      </md-list>
    </div>
  </div>
</template>
<script>
import SidebarLink from "./SidebarLink.vue";

export default {
  components: {
    SidebarLink
  },
  props: {
    title: {
      type: String,
      default: "SIH ATM"
    },
    backgroundImage: {
      type: String,
      default: require("@/assets/img/tumblr_my17j8jhIP1qg20eyo1_500.jpg")
    },
    imgLogo: {
      type: String,
      default: require("@/assets/img/airport (1).svg"),
      
    },
    activeColor: {
      type: String,
      default: "blue",
      validator: value => {
        let acceptedValues = ["", "purple", "blue", "green", "orange", "red"];
        return acceptedValues.indexOf(value) !== -1;
      }
    },
    sidebarLinks: {
      type: Array,
      default: () => []
    },
    autoClose: {
      type: Boolean,
      default: true
    }
  },
  provide() {
    return {
      autoClose: this.autoClose
    };
  },
  computed: {
    sidebarStyle() {
      return {
        backgroundImage: `url(${this.backgroundImage})`
      };
    }
  }
};
</script>
<style>
@media screen and (min-width: 991px) {
  .nav-mobile-menu {
    display: none;
  }
}
.active{
  background-color:"#1b263b !important"
}
</style>
