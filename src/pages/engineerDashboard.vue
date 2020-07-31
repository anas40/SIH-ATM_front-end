<template>
  <div class="employeeContainer body">
   
    <div class="scrollBox">
      <section v-for="element in totalElement" :key="element.heading">
        <div class="header">
          <h5>{{ element.heading }}</h5>
          <div class="hamButtons">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div class="cardsContainer">
          <div v-if="element.orders.length === 0" class="card">
            No orders in {{ element.heading }}
          </div>
          <div
            class="card"
            v-else
            v-for="order in element.orders"
            :key="order._id"
          >
            <div>
              <p>{{ order.assignmentCode }}</p>
            </div>
            <div>
              <p>{{ order.work }}</p>
            </div>
            <div class="linkContainer">
              <router-link :to="returnLink(element.heading, order._id)"
                >Check Details</router-link
              >
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Axios from '@/methods/axiosInstance.js'
export default {
  data() {
    return {
      totalElement: []
    }
  },
  async mounted() {
    try {
      console.log('Firing request for order from engineer dashboard')
      const { data } = await Axios().get('/engineerOrders')
      console.log('engineer dashboard', data)
      //removing engineer data from array
      data.pop()
      this.totalElement = data
    } catch (error) {
      if (error.response && error.response.status === 401) {
        this.$router.push({ name: 'login' })
      }
      console.log(error)
    }
  },
  methods: {
    returnLink(heading, id) {
      if (heading === 'Assigned') {
        return `/engineertask`
      } else if (heading === 'Progress') {
        return `/complianceform/${id}`
      } else if (heading === 'Completed' || heading === 'Review') {
        return `/approval/${id}`
      }
    }
  }
}
</script>

<style lang="css" scoped>
.body {
  background-color: hsl(20, 100%, 80%);
  padding: 10px 0;
  font-family: 'Roboto Slab';
  font-size: 13px;
  line-height: 1.8;
  color: black;
  font-weight: 400;
}
.header {
  display: flex;
  justify-content: space-between;
}
.hamButtons {
  cursor: pointer;
  display: flex;
  align-items: center;
}
.hamButtons span {
  display: block;
  height: 5px;
  width: 5px;
  margin: 2px;
  border-radius: 50%;
  background-color: white;
}
.employeeContainer {
  overflow-x: auto;
  /*
  background-color: #204051;
  */
}

.scrollBox {
  display: inline-flex;
}

.scrollBox > section {
  border-radius: 8px;
  padding: 8px;
  background-color: #42aacc;
  color: #fff;
  margin: 20px 0px 20px 20px;
  min-width: 300px;
  height: 80vh;
  overflow-y: auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.25);
}
.scrollBox > ::-webkit-scrollbar {
  width: 5px !important;
  display: block;
}
.scrollBox > ::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
.scrollBox > ::-webkit-scrollbar-thumb {
  background-color: gold;
}
.cardsContainer {
  padding: 8px;
  border-radius: 8px;
  /* background-color: #84a9ac; */
}
.card {
  padding: 8px;
  color: black;
  margin: 12px 0;
}
.cardsContainer .card p {
  color: #204051;
  font-size: 13px;
  margin-bottom: 8px;
}
.linkContainer a {
  float: right;
  /* display: block; */
  border: 1px solid;
  font-size: 12px;
  border-radius: 6px;
  padding: 4px 8px;
  color: #204051 !important;
  cursor: pointer;
}
h1 {
  font-size: 2rem;
  border: 1px solid;
}
</style>
