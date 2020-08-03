<template>
  <div id="allContainer">
    <div>
      <div class="heading"><h1>Equipment form</h1></div>
      <form @submit.prevent="addEquipment">
        <div>
          <label for="equipmentNumber">Equipment Number :</label>
          <input
            placeholder="Equipment Number"
            v-model="equipmentNumber"
            type="text"
            name=""
            id="equipmentNumber"
          />
        </div>
        <div>
          <label for="equipmentCode">Equipment Code :</label>
          <input
            placeholder="Equipment Code"
            v-model="equipmentCode"
            type="text"
            name=""
            id="equipmentCode"
          />
        </div>
        <div>
          <label for="description">Description :</label>
          <input
            placeholder="Description"
            v-model="description"
            type="text"
            name=""
            id="description"
          />
        </div>
        <div>
          <label for="name">Equipment Name :</label>
          <input
            placeholder="Equipment Name"
            v-model="name"
            type="text"
            name=""
            id="name"
          />
        </div>
        <div>
          <label for="voltage">Voltage :</label>
          <input
            placeholder="Ideal Voltage"
            v-model="voltage"
            type="text"
            name=""
            id="voltage"
          />
        </div>
        <div>
          <label for="current">Current :</label>
          <input
            placeholder="Ideal Current"
            v-model="current"
            type="text"
            name=""
            id="current"
          />
        </div>
        <div>
          <label for="temperature">Temperature :</label>
          <input
            placeholder="Temperature"
            v-model="temperature"
            type="text"
            name=""
            id="temperature"
          />
        </div>
        <div>
          <button type="submit">Add the equipment</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Axios from '@/methods/axiosInstance.js'

export default {
  data() {
    return {
      equipmentNumber: '',
      equipmentCode: '',
      description: '',
      name: '',
      voltage: '',
      current: '',
      temperature: ''
    }
  },
  methods: {
    async addEquipment() {
      try {
        const payLoad = {
          voltage: this.voltage,
          current: this.current,
          temperature: this.temperature,
          equipmentNumber: this.equipmentNumber,
          equipmentCode: this.equipmentCode,
          name: this.name,
          description: this.description
        }
        console.log(payLoad)

        const response = await Axios().post('/addequipment', payLoad)

        if (response.status === 200) {
          this.$router.push({ name: 'DataWarehousing' })
        }
      } catch (error) {
        console.log(error)
        alert('Error ocurred check input fields and try again')
      }
    }
  }
}
</script>

<style scoped>
#allContainer {
  margin: 50px 0;
}
.heading {
  text-align: center;
  margin: 20px 0;
  padding: 20px;
}
form {
  margin: 0 auto;
  width: 500px;
}
form > div {
  margin: 30px;
}

input {
  position: relative;
  top: -10px;
  border: 1px solid #333;
  float: right;
  padding: 8px 12px;
  border-radius: 8px;
}

#allContainer input:focus {
  border: 1px solid #333 !important;
}
button {
  width: fit-content;
  min-width: 250px;
  padding: 8px 12px;
  color: white;
  font-weight: 500;
  margin: 15px auto;
  display: block;
  background-color: #03a544;
}
</style>
