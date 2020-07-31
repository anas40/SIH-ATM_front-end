<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/employeedashboard">
        <md-icon>dashboard</md-icon>
        <p>Dashboard</p>
      </sidebar-link>
      <sidebar-link to="/engineerDashboard">
        <md-icon>dashboard</md-icon>
        <p>Engineer Dashboard</p>
      </sidebar-link>
      <sidebar-link to="/dataWarehousing">
        <md-icon>house</md-icon>
        <p>Data Warehouse</p>
      </sidebar-link>
       <sidebar-link to="/searchingorders">
        <md-icon>search</md-icon>
        <p>Search Orders</p>
      </sidebar-link>
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content></dashboard-content>

      <!--
      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      -->
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from './TopNavbar.vue'
//import ContentFooter from './ContentFooter.vue'
import DashboardContent from './Content.vue'
import MobileMenu from '@/pages/Layout/MobileMenu.vue'

export default {
  components: {
    TopNavbar,
    DashboardContent,
    //ContentFooter,
    MobileMenu
  }
}
</script>
<style scoped>
.main-panel{
  min-height: 100vh;
}
p{
  color : white
}
</style>