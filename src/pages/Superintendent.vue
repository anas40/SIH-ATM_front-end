<template>
  <Loader v-if="loading" />

  <div v-else class="employeeContainer body">
    <div class="button-cover">
      <div class="button r" id="button-9">
        <input type="checkbox" checked @click="changeView" class="checkbox" />
        <div class="knobs">
          <span></span>
        </div>
        <div class="layer"></div>
      </div>
    </div>
    <div v-if="graphical && barChart" class="container-fluid">
      <div class="row">
        <div class="col-sm-3 col-md-6 chart" style="padding:30px;">
          <pie-chart :chart-data="chartData"></pie-chart>
        </div>
        <div class="col-sm-3 col-md-6 chart" style="padding:30px;">
          <bar-chart :chart-data="barChart"></bar-chart>
        </div>
      </div>
    </div>
    <div v-else class="scrollBox">
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
        <Loader v-if="element.heading === 'Todo' && loadingS" />
        <div v-else class="cardsContainer">
          <div class="card" v-if="element.orders.length === 0">
            No Orders in {{ element.heading }}
          </div>
          <div v-else>
            <p class="totalText">Total Orders : {{ element.orders.length }}</p>
          </div>

          <div>
            <div v-if="element.orders.length !== 0">
              <div
                class="card"
                v-for="order in element.orders"
                :key="order._id"
              >
                <div>
                  <p>{{ order.number }}</p>
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

import PieChart from '@/pages/Layout/PieChart.js'
import BarChart from '@/pages/Layout/BarChart.js'

export default {
  data() {
    return {
      totalElement: [],
      orderByTime: '',
      loading: true,
      loadingS: false,
      chartData: null,
      graphical: false,
      barChart: null,
      healthData: ''
    }
  },
  components: {
    Loader,
    PieChart,
    BarChart
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
    },
    changeView() {
      this.graphical = !this.graphical
    }
  },
  async mounted() {
    try {

      const {data:userdata} = await Axios().get('/typeofuser')

      if(userdata.typeofUser === 'engineer'){
        this.$router.push({name:'engineerDashboard'})
      }
      const { data } = await Axios().get('/employeeOrders')
      console.log('this is data', data)
      this.totalElement = data

      const { data: health } = await Axios().get('/gethealth')
      console.log('health', health)
      this.healthData = health

      this.loading = false

      //pie chart view
      this.chartData = {
        labels: ['Todo', 'Assigned', 'Progress', 'Review', 'Completed'],
        datasets: [
          {
            backgroundColor: [
              '#2ecc71',
              '#3498db',
              '#95a5a6',
              '#9b59b6',
              '#34495e'
            ],
            data: [
              this.totalElement[0].orders.length,
              this.totalElement[1].orders.length,
              this.totalElement[2].orders.length,
              this.totalElement[3].orders.length,
              this.totalElement[4].orders.length
            ]
          }
        ]
      }

      this.barChart = {
        labels: ['Healthy', 'Fair', 'Poor', 'Scrap'],
        datasets: [
          {
            label: 'Equipment State',
            backgroundColor: '#f87979',

            data: [
              this.healthData.Healthy,
              this.healthData.Fair,
              this.healthData.Poor,
              this.healthData.Scrap
            ]
          }
        ]
      }
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
.chart {
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);
}
.body {
  background-color: #e0e1dd;
  padding: 10px 0;
  font-family: 'Roboto Slab';
  font-size: 13px;
  line-height: 1.8;
  color: black;
  font-weight: 500;
  min-height: 100vh;
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
  position: relative;
  background-color: #0d1b2a;
  background-image: url('/src/assets/img/arabica-890.svg');
  color: #fff;
  margin: 20px 0px 20px 20px;
  min-width: 300px;
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
  cursor: pointer;
  background-color: #0d1b2a;
  color: white !important;
}
h1 {
  font-size: 2rem;
  border: 1px solid;
}

.button-cover {
  margin: 10px;
  background-color: transparent;
  border-radius: 4px;
}

.button-cover:before {
  counter-increment: button-counter;
  content: counter(button-counter);
  position: absolute;
  right: 0;
  bottom: 0;
  color: #d7e3e3;
  font-size: 12px;
  line-height: 1;
  padding: 5px;
}

.knobs,
.layer {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.button {
  position: relative;

  width: 150px;
  height: 36px;
  margin: 0 auto;
  overflow: hidden;
}

.button.r,
.button.r .layer {
  border-radius: 8px;
}

.button.b2 {
  border-radius: 2px;
}

.checkbox {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  opacity: 0;
  cursor: pointer;
  z-index: 3;
}

.knobs {
  z-index: 2;
}

.layer {
  width: 100%;
  background-color: #ebf7fc;
  transition: 0.3s ease all;
  z-index: 1;
}
#button-9 .knobs:before,
#button-9 .knobs:after,
#button-9 .knobs span {
  position: absolute;
  top: 2px;
  width: 20px;
  height: 10px;
  font-size: 10px;
  font-weight: bold;
  text-align: center;
  line-height: 1;
  padding: 9px 4px;
  border-radius: 500px;
  transition: 0.4s cubic-bezier(0.18, 0.89, 0.35, 1.15) all;
}

#button-9 .knobs:before {
  content: 'Graph';
  width: 50px;
  left: 4px;
  top: 5px;
  height: 36px;
}

#button-9 .knobs:after {
  content: 'Card';
  width: 50px;
  right: -50px;
  top: 5px;
}

#button-9 .knobs:before,
#button-9 .knobs:after {
  color: #fff;
  z-index: 2;
}

#button-9 .knobs span {
  left: 4px;
  width: 50px;
  height: 30px;
  background-color: #03a9f4;
  z-index: 1;
}

#button-9 .checkbox:checked + .knobs:before {
  left: -50px;
}

#button-9 .checkbox:checked + .knobs:after {
  right: 4px;
}

#button-9 .checkbox:checked + .knobs span {
  left: 100px;
  background-color: #f44336;
}

#button-9 .checkbox:checked ~ .layer {
  background-color: #fcebeb;
}
</style>
