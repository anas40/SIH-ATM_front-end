<template>
  <Loader v-if="loading" />

  <div v-else>
    <div id="container">
      <div class="profile">
        <section class="details">
          <div>
            <div>
              <h5>
                Name :
                <span style="color:#e0e1dd">{{ engineer.name }}</span>
              </h5>
            </div>
            <div>
              <h5>
                Id :
                <span style="color:#e0e1dd">{{ engineer.engineerID }}</span>
              </h5>
            </div>
          </div>
        </section>
        <section class="userImage">
          <dir>
            <img :src="require(`@/assets/img/new_logo.png`)" />
          </dir>
        </section>
      </div>
      <section id="heading">
        Assigned Orders : {{ ordersData.orders.length }}
      </section>
      <div v-if="ordersData.orders" class="orderContainer">
        <div v-for="(order, index) in ordersData.orders" :key="index">
          <h3>Order : {{ index + 1 }}</h3>
          <div class="order">
            <div class="flex">
              <div class="firstChild">
                Order No. :
                <span>{{ order._id }}</span>
              </div>
              <div class="secondChild">
                Cycle :
                <span>{{ order.cycle }}</span>
              </div>
            </div>
            <div>
              Equipment :
              <span>{{ order.equipmentCode }}</span>
            </div>
            <div>
              Description :
              <span>{{ order.work }}</span>
            </div>
            <div>
              Status :
              <span>Assigned</span>
            </div>
            <div>
              Location :
              <span>{{ order.location }}</span>
            </div>
            <div class="flex">
              <div class="firstChild">
                Assigned on :
                <span v-if="order.assignmentDate">{{ order.assignmentDate.slice(0,10) }}</span>
              </div>
              <div class="secondChild">
                Deadline :
                <span v-if="order.deadlineDate">{{ order.deadlineDate.slice(0,10) }}</span>
              </div>
            </div>
            <div class="buttonContainer">
              <button :value="order._id" @click="moveToProgress">Accept</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from '@/methods/axiosInstance.js'
import Loader from '@/pages/Layout/Loader'

export default {
  data() {
    return {
      engineer: {},
      ordersData: {
        heading: '',
        orders: [
          {
            name: 'Anas',
            id: '18COB037',
            totalOrders: 4,
            orderNo: '123jrhj4',
            cycle: '3 Months',
            equipmentId: '34hg56',
            description: 'complete the task',
            location: 'section 34, Plant 34',
            status: 'Need replacement',
            assignedDate: '13-Jun-2020',
            deadlineDate: '12-July-2020'
          }
        ]
      },
      loading: true
    }
  },
  components: {
    Loader
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      try {
        this.loading = true
        //make a request with authorization jwt header to fetch details from bak here
        const { data } = await Axios().get('/engineerOrders')

        this.ordersData = data[0]
        this.engineer = data[4]
        console.log('from engineer task', data[0], data[4])
        this.loading = false
      } catch (error) {
        this.loading = false

        if (error.response && error.response.status === 401) {
          this.$router.push({ name: 'login' })
        }
        console.log('Fetch Error:', error)
      }
    },
    async moveToProgress(event) {
      try {
        this.loading = true

        console.log('Press the button', event.target.value)
        const response = await Axios().patch(
          `/toprogress/${event.target.value}`
        )
        if (response.status === 200) {
          console.log('Accepted order successfully')
          await this.fetchData()
        }
        this.loading= false
      } catch (error) {
        this.loading= false

        console.log(error)
      }
    }
  }
}
</script>

<style lang="css" scoped>
#container {
  padding: 12px;
  min-height: 75vh;
  background-color:#e0e1dd;
}
.profile {
  background-color: #0d1b2a;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 8px 20px;
}
button#profile{
  background-color: transparent;
}
h5{
  color:white;
}
#heading {
  font-size: 1.4rem;
  margin: 15px 0;
  color: white;
  border-radius: 4px;
  padding: 12px 20px;
  background-color: #ff0054;
  opacity: 0.9;
}
.userImage img {
  height: 150px;
  width: 150px;
}
.orderContainer {
  padding: 12px 20px;
}
.orderContainer h3 {
  color: #1b263b;
}
.order {
  margin: 20px 0;
  padding: 16px;
  background-color: #0d1b2a;
  border-radius: 8px;
  box-shadow: 0 0 4px -2px black;
  opacity: 0.9;
}
.order > div {
  font-weight: 500;
  color: #fff;
  margin-bottom: 10px;
  /* border-bottom: 1px solid; */
}
.order > div span,
.details span {
  color: #fff;
  font-weight: 450;
}
.flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.secondChild {
  flex-basis: 40%;
}
.buttonContainer {
  margin: 10px;
  margin-top: 40px;
  margin-left: 0;
}
.orderContainer .buttonContainer button {
  border-radius: 12px;
  font-weight: 500;
  border: 1px solid;
  color: #111;
  padding: 8px 12px;
  background-color: white;
}
.orderContainer .buttonContainer button:hover {
  color: cornflowerblue;
}
@media (max-width: 600px) {
  .firstChild {
    flex-basis: 100%;
    margin-bottom: 10px;
  }
  .secondChild {
    flex-basis: 100%;
  }
}
</style>
