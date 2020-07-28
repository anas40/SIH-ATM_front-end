<template>
  <section class="searchingcontainer">
    <div class="heading">
      <h1>Assignment Collection</h1>
      <p>{{equipmentModel}}</p>
    </div>
    <section class="searchFieldContainer">
      <section class="searchByquery">
        <div>
          <label for="assignmentId">Assignment Id :</label>
          <input
            @keydown.enter="handleSearch"
            v-model="assId"
            id="assignmentId"
            type="text"
            placeholder="Enter Assignment Id ..."
          />
        </div>
        <div>
          <label for="equipmentId">Equipment Id :</label>
          <input
            @keydown.enter="handleSearch"
            v-model="equId"
            type="text"
            id="equipmentId"
            placeholder="Enter Equipment Id ..."
          />
        </div>
      </section>

      <section class="searchByfield">
        <div>
          <div class="selectContainer">
            <label for="location">Location :</label>
            <select v-model="locationModel" name="location" id="location">
              <option disabled value>select Location</option>
              <option
                v-for="location in locations"
                :key="location._id"
                :value="location.name"
              >{{location.name}}</option>
            </select>
          </div>
          <div class="selectContainer">
            <label for="equipment">Equipment :</label>
            <select v-model="equipmentModel" name="equipment" id="equipment">
              <option disabled value>select Equipment</option>
              <option
                v-for="equipment in equipments"
                :key="equipment._id"
                :value="equipment.name"
              >{{equipment.name}}</option>
            </select>
          </div>
          <div class="selectContainer">
            <label for="date">Date :</label>
            <select v-model="date" name="date" id="date">
              <option disabled value>select Date</option>
            </select>
          </div>
        </div>
        <div class="radioContainer">
          <h5 for="status">Status :</h5>
          <div class="radioBox">
            <div>
              <label for="status1">Pending</label>
              <input v-model="statusBox" value="Pending" type="radio" name="status" id="status1" />
            </div>
            <div>
              <label for="status2">Completed</label>
              <input v-model="statusBox" value="Completed" type="radio" name="status" id="status2" />
            </div>
            <div>
              <label for="status3">All</label>
              <input v-model="statusBox" value type="radio" name="status" id="status3" />
            </div>
          </div>
        </div>
      </section>
      <div class="searchButton">
        <button @click="handleSearch">Search</button>
      </div>
    </section>

    <div class="orderContainer">
      <div v-for="(order,index) in data" :key="order._id">
        <h3>Order : {{ index+1 }}</h3>
        <div class="order">
          <div class="flex">
            <div class="firstChild">
              Order No. :
              <span>{{order.number}}</span>
            </div>
            <div class="secondChild">
              Cycle :
              <span>{{order.cycle}}</span>
            </div>
          </div>
          <div>
            Equipment :
            <span>{{order.equipment}}</span>
          </div>
          <div>
            Description :
            <span>{{order.task}}</span>
          </div>
          <div>
            Status :
            <span>{{order.completed}}</span>
          </div>
          <div>
            Location :
            <span>{{order.location}}</span>
          </div>
          <div class="flex">
            <div class="firstChild">
              Assigned on :
              <span>{{order.assignedDate}}</span>
            </div>
            <div class="secondChild">
              Deadline :
              <span>{{order.deadlineDate}}</span>
            </div>
          </div>
          <div class="buttonContainer">
            <router-link :to="`/complianceform/${order._id}`">Visit Compliance Form</router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      statusBox: '',
      locations: [],
      equipments: [],
      locationModel: '',
      equipmentModel: '',
      equId: '',
      assId: '',
      date: '',
      data:[ {
        name: 'Anas',
        id: '18COB037',
        totalOrders: 2,
        orderNo: '123jrhj4',
        cycle: '3 Months',
        equipmentId: '34hg56',
        description: 'complete the task',
        location: 'section 34, Plant 34',
        status: 'Need replacement',
        assignedDate: '13-Jun-2020',
        deadlineDate: '12-July-2020'
      }]
    }
  },
  mounted() {
    this.getOrders()
    this.getLocation()
    this.getEquipments()
  },
  methods: {
    handleSearch() {
      this.getOrders()
    },
    async getLocation() {
      try {
        const { data: location } = await axios.get(
          `http://localhost:3000/locations`,
          {
            headers: { authorization: this.$cookies.get('token') }
          }
        )
        // console.log('locations fetched', location)
        this.locations = location
      } catch (error) {
        console.error('Error in fetching locations', error)
      }
    },
    async getEquipments() {
      try {
        const { data: equipment } = await axios.get(
          `http://localhost:3000/equipment-list`,
          {
            headers: { authorization: this.$cookies.get('token') }
          }
        )
        // console.log('eequipmetns fetched', equipment)
        this.equipments = equipment
      } catch (error) {
        console.error('Error in fetchi&& nullng equipments', error)
      }
    },
    async getOrders() {
      try {
        const body = {
          completed: this.statusBox || 'All',
          locationId: this.assId || 'All',
          equipmentId: this.equId || 'All',
          equipmentName: this.equipmentModel || 'All',
          locationName: this.locationModel || 'All'
        }
        const { data: orders } = await axios.post(
          `http://localhost:3000/searchorders`,
          body,
          {
            headers: { authorization: this.$cookies.get('token') }
          }
        )
        this.data = orders
        console.log('orders fetched', orders)
      } catch (error) {
        console.log('Error in orders', error, error.response)
      }
    }
  }
}
</script>

<style lang="css" scoped>
.searchingcontainer {
  min-height: 90vh;
  padding: 8px;
  background-image:linear-gradient(rgba(0, 0, 0, 0.5),
                       rgba(0, 0, 0, 0.5)),url('https://ikarosaviationtraining.com/wp-content/uploads/maintenance-2.jpg');
  background-repeat:no-repeat;
  background-attachment:fixed;
  background-size:cover;
}
.heading h1 {
  font-size: 2rem;
  margin: 0 10px;
  border-radius: 8px;
  color: #fff;
  text-shadow: -1px 1px 2px #3f4441;
  background: #ED213A;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #93291E, #ED213A);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #93291E, #ED213A); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
opacity:0.9;
  padding: 8px 12px;
  text-align: center;
}
.searchFieldContainer {
  padding: 8px;
  background: #4b6cb7;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #182848, #4b6cb7);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #182848, #4b6cb7); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  margin: 10px;
  border-radius: 8px;
}

.searchByquery {
  margin: 20px 12px;
  background-color: white;
  padding: 8px 12px;
  border-radius: 8px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.searchByquery input {
  min-width: 260px;
  padding: 8px;
  margin: 0 10px;
  color: #3b6978;
  border: 1px solid;
  border-radius: 8px;
}
.searchByfield {
  margin: 20px 0;
  display: flex;
  justify-content: space-evenly;
}

.searchByfield > div {
  flex-basis: calc(50% - 18px);
  border-radius: 8px;
  background-color: white;
  min-width: 280px;
  padding: 8px;
}
.selectContainer {
  margin: 12px 0;
}
.selectContainer label {
  width: 160px;
}
.selectContainer select {
  width: 180px;
  background-color: #eeecda;
  border: none;
  font-weight: 600;
  font-size: 14px;
  border-radius: 8px;
  margin: 0 10px;
  color: #3f4441;
  /* background-color: white; */
  padding: 8px;
}
.radioContainer {
}
.radioBox {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
}
.radioBox label {
  padding: 4px 8px;
}

.orderContainer {
  padding: 12px 12px;
}
.orderContainer > div {
  padding: 8px;
background: #2b5876;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #4e4376, #2b5876);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #4e4376, #2b5876); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
opacity:0.9;
  margin: 10px 0;
  border-radius: 8px;
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
.searchButton {
  width: fit-content;
  background-color: #fff;
  border-radius: 4px;
  margin-left: 12px;
  position: relative;
  right: -89%;
}
.searchButton button {
  padding: 12px 20px;
  color: black;
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