<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link v-if="user === 'employee'" to="/superintendent">
        <md-icon>dashboard</md-icon>
        <p>Dashboard</p>
      </sidebar-link>
      <sidebar-link v-if="user !== 'employee'" to="/engineerDashboard">
        <md-icon>dashboard</md-icon>
        <p>Engineer Dashboard</p>
      </sidebar-link>
      <sidebar-link v-if="user === 'employee'" to="/dataWarehousing">
        <md-icon>house</md-icon>
        <p>Data Warehouse</p>
      </sidebar-link>
      <sidebar-link v-if="user === 'employee'" to="/searchingorders">
        <md-icon>search</md-icon>
        <p>Search Orders</p>
      </sidebar-link>
      <sidebar-link v-if="user === 'employee'" to="/addequipmentform">
        <md-icon>house</md-icon>
        <p>Add Equipment</p>
      </sidebar-link>
      <div id="monitorContainer">
        <a id="newPageMonitor" target="_blank" href="http://localhost:3000/d/sHqZLA4Gz/equipment1?from=now-5m&orgId=1&refresh=1s&to=now">
          <md-icon>monitor</md-icon>
          <p>Monitor</p>
        </a>
      </div>
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

import Axios from '@/methods/axiosInstance.js'

export default {
  components: {
    TopNavbar,
    DashboardContent,
    MobileMenu
  },
  data() {
    return {
      user: 'employee'
    }
  },
  async mounted() {
    this.usertype()
  },
  methods: {
    async usertype() {
      const { data } = await Axios().get('/typeofuser')
      this.user = data.typeofUser
    }
  }
}
</script>
<style scoped>
#monitorContainer {
  margin: 0 auto;
  width: 225px;
  padding: 10px;
  padding-left: 30px;
  margin-left: 5px;
}
#newPageMonitor {
  max-width: 225px;
}
#newPageMonitor p {
  display: inline;
}
.main-panel {
  min-height: 100vh;
}
p {
  color: white;
}
</style>
