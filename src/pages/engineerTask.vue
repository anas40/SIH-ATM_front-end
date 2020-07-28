<template>
  <div>
    <div id="container">
      <div class="profile">
        <section class="details">
          <div>
            <div>
              <h5>
                Name :
                <span>{{data.name}}</span>
              </h5>
            </div>
            <div>
              <h5>
                Id :
                <span>{{data.id}}</span>
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
        Assigned Orders :
        <span>{{data.totalOrders}}</span>
      </section>
      <div class="orderContainer">
        <div v-for="number in data.totalOrders" :key="number">
          <h3>Order : {{data.number}}</h3>
          <div class="order">
            <div class="flex">
              <div class="firstChild">
                Order No. :
                <span>{{data.orderNo}}</span>
              </div>
              <div class="secondChild">
                Cycle :
                <span>{{data.cycle}}</span>
              </div>
            </div>
            <div>
              Equipment :
              <span>{{data.equipmentId}}</span>
            </div>
            <div>
              Description :
              <span>{{data.description}}</span>
            </div>
            <div>
              Status :
              <span>{{data.status}}</span>
            </div>
            <div>
              Location :
              <span>{{data.location}}</span>
            </div>
            <div class="flex">
              <div class="firstChild">
                Assigned on :
                <span>{{data.assignedDate}}</span>
              </div>
              <div class="secondChild">
                Deadline :
                <span>{{data.deadlineDate}}</span>
              </div>
            </div>
            <div class="buttonContainer">
              <router-link :to="`/complianceform/${data.orderNo}`">Visit Compliance Form</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      data: {
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
    }
  },
  async mounted() {
    try {
      //make a request with authorization jwt header to fetch details from bak here
      const { data } = await axios.get('http://localhost:3000/engineerOrders', {
        headers: { authorization: this.$cookies.get('token') }
      })
      this.data = data
    } catch (error) {
       if(error.response && error.response.status === 401){
        this.$router.push({name:'login'})
      }
      console.log('Fetch Error:', error)
    }
  },
  methods: {}
}
</script>

<style lang="css" scoped>
#container {
  padding: 12px;
  min-height: 75vh;
  background-image:linear-gradient(rgba(0, 0, 0, 0.5),
                       rgba(0, 0, 0, 0.5)),url('/assets/images/Background/ItemDescription_BG.jpg');
  background-repeat:no-repeat;
  background-attachment:fixed;
  background-size:cover;
}
.profile {
  background-color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 8px 20px;
  opacity:0.9;
}
#heading {
  font-size: 1.4rem;
  margin: 15px 0;
  color: white;
  border-radius: 4px;
  padding: 12px 20px;
  background-color: #e8505b;
  opacity:0.95;
}
.userImage img {
  height: 150px;
  width: 150px;
}
.orderContainer {
  padding: 12px 20px;
}
.orderContainer h3 {
  color: white;
}
.order {
  margin: 20px 0;
  padding: 16px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 4px -2px black;
  opacity:0.9;
}
.order > div {
  font-weight: 500;
  color: rgba(0, 0, 0, 0.9);
  margin-bottom: 10px;
  /* border-bottom: 1px solid; */
}
.order > div span,
.details span {
  color: rgba(0, 0, 0, 0.7);
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
.orderContainer .buttonContainer a {
  border-radius: 12px;
  font-weight: 500;
  border: 1px solid;
  color: cornflowerblue;
  padding: 8px 12px;
  background-color: white;
}
.orderContainer .buttonContainer a:hover {
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