<template>
  <div class="employeeContainer body">
    <div class="scrollBox">
      <section v-for="element in totalElement" :key="element.heading">
        <div class="header">
          <h5>{{element.heading}}</h5>
          <div class="hamButtons">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div class="cardsContainer">
          <div class="card" v-for="order in element.orders" :key="order._id">
            <div>
              <p>{{order.assignmentCode}}</p>
            </div>
            <div>
              <p>{{order.work}}</p>
            </div>
            <div class="linkContainer">
              <router-link :to="returnLink(element.heading,order._id)">Check Details</router-link>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      totalElement: [
        {
          heading: 'Todo',
          totalOrders: 4,
          orders: [
            {
              orderId: '1234e54',
              description: 'Cleaned the extra lubricant',
              link: '/toorder'
            },
            {
              orderId: '1234e55',
              description: 'Cleaned the extra lubricant',
              link: '/toorder'
            },
            {
              orderId: '1234e56',
              description: 'Cleaned the extra lubricant',
              link: '/toorder'
            }
          ]
        }
      ]
    }
  },
  async mounted() {
    try {
      const { data } = await axios.get(`http://localhost:3000/engineerOrders`, {
        headers: { authorization: this.$cookies.get('token') }
      })
      console.log('this is data', data)
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
      if (heading === 'Todo' || heading === 'Progress') {
        return `/complianceform/${id}`
      }
      else if(heading === 'Completed' || heading === 'Review'){
        return `/engineertask`
      }
     
    }
  }
}
</script>

<style lang="css" scoped>
.body{

  background-image:linear-gradient(rgba(0, 0, 0, 0.5),
                       rgba(0, 0, 0, 0.5)),url('/assets/images/Background/EngineerDashboard_BG.jpg');
  background-repeat:no-repeat;
  background-attachment:fixed;
  background-size:cover;
  padding: 60px 0;
  font-family:'Roboto Slab';
  font-size:13px;
  line-height: 1.8;
  color: black;
  font-weight:400;
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
  /*background-color: #42aacc;*/
  background: #c2e59c; /* fallback for old browsers */
  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to bottom,
    #64b3f4,
    #57d6dd
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  opacity:0.9;
  color: #fff;
  margin: 20px 0px 20px 20px;
  min-width: 300px;
  min-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.25);
}
.cardsContainer {
  padding: 8px;
  border-radius: 8px;
  /* background-color: #84a9ac; */
}
.card {
  padding: 8px;
  margin: 12px 0;
}
.cardsContainer .card p {
  color:#204051;
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