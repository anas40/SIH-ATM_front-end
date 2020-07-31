<template>
  <Loader v-if="loading" />

  <div v-else class="employeeContainer body">
    <div class="scrollBox">
      <div v-if="totalElement.length === 0">No Orders</div>
      <section v-for="element in totalElement" :key="element.heading">
        <div class="header">
          <h5>{{ element.heading }}</h5>
          <div v-if="element.heading === 'Todo'" class="selectTheTime">
            <div>
              <select
                @change="changeOrders"
                v-model="orderByTime"
                name="orders"
                id="OrderByTime"
              >
                <option value="" disabled>select Time</option>
                <option value="daily">daily</option>
                <option value="weekly">weekly</option>

                <option value="monthly">monthly</option>

                <option value="six-monthly">six-monthly</option>
              </select>
            </div>
          </div>
          <div class="hamButtons">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div class="cardsContainer">
          <div class="card" v-if="element.orders.length === 0">
            No Orders in {{ element.heading }}
          </div>
          <div v-else>
            <p class="totalText">Total Orders : {{ element.orders.length }}</p>
          </div>

          <Loader v-if="element.heading === 'Todo' && loadingS" />
          <div v-else>
            <div v-if="element.orders.length !== 0">
              <div
                class="card"
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
                  <router-link
                    v-if="element.heading === 'Todo'"
                    :to="`/joblist/${order._id}`"
                    >Assign</router-link
                  >
                  <router-link
                    v-else-if="element.heading === 'Progress'"
                    :to="`/approval/${order._id}`"
                    >Check</router-link
                  >
                  <router-link
                    v-else-if="element.heading === 'Assigned'"
                    to="/searchingOrders"
                    >Search</router-link
                  >
                  <router-link
                    v-else-if="element.heading === 'Review'"
                    :to="`/approval/${order._id}`"
                    >Approve</router-link
                  >
                  <router-link
                    v-else-if="element.heading === 'Completed'"
                    to="/searchingorders"
                    >Search</router-link
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Loader from '@/pages/Layout/Loader'
import Axios from '@/methods/axiosInstance.js'
export default {
  data() {
    return {
      totalElement: [],
      orderByTime: '',
      loading: true,
      loadingS:false
    }
  },
  components: {
    Loader
  },
  methods: {
    async changeOrders() {
      try {
        this.loadingS = true
        const { data } = await Axios().get(`/orders/${this.orderByTime}`)
        console.log(`orders change,${this.orderByTime}`, data)
        this.totalElement[0].orders = data
        this.loadingS = false
      } catch (error) {
        this.loadingS = false

        if (error.response && error.response.status === 401) {
          this.$router.push({ name: 'login' })
        }
        console.log(error)
      }
    }
  },
  async mounted() {
    try {
      const { data } = await Axios().get('/employeeOrders')
      console.log('this is data', data)
      this.totalElement = data
      this.loading = false
    } catch (error) {
      this.loading = false

      if (error.response && error.response.status === 401) {
        this.$router.push({ name: 'login' })
      }
      console.log(error)
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
  font-weight: 500;
}

.header {
  display: flex;
  justify-content: space-between;
}
#OrderByTime {
  padding: 4px 12px;
  font-size: 14px;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  background-color: white;
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
.totalText {
  font-size: 15px;
  color: white;
  font-weight: 600;
}
.scrollBox {
  display: inline-flex;
}

.scrollBox > section {
  height: 80vh;
  border-radius: 8px;
  padding: 8px;
  background-color: #42aacc;
  background-image: url('/src/assets/img/arabica-890.svg');
  color: #fff;
  margin: 20px 0px 20px 20px;
  min-width: 300px;
  overflow-y: auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.25);
  opacity: 0.9;
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
  position: relative;
  min-height: 200px;
}
.card {
  padding: 8px;
  color: #000;
  margin: 12px 0;
}
.card p {
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
