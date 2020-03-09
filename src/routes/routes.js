import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";
// import Login from "@/pages/Login.vue";

// import Dashboard from "@/pages/Dashboard.vue";
import TableList from "@/pages/TableList.vue";
import itemDescription from "@/pages/itemDescription.vue";
import ComplianceForm from "@/pages/Complianceform.vue";

// import Typography from "@/pages/Typography.vue";
// import Icons from "@/pages/Icons.vue";
// import Maps from "@/pages/Maps.vue";
// import Notifications from "@/pages/Notifications.vue";
// import UserProfile from "@/pages/UserProfile.vue";

const routes = [{
  path: "/",
  component: DashboardLayout,
  redirect(){
    window.location.href = 'http://localhost:3000/login'
  },
  children: [{
      path: '/joblist',
      name: 'Joblist',
      component: TableList
    },
    {
      path: '/joblist/:id',
      name: 'Item description',
      component: itemDescription
    },
    {
      path: '/complianceform',
      name: 'Compliance Form',
      component: ComplianceForm
    }
  ]
}];

export default routes;