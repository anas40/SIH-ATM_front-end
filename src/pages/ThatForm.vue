<template>
  <div class="manualData">
    <div class="leftBox">
      <div class="imageContainer">
        <img :src="require('@/assets/img/controller.jpeg')" alt="" />
      </div>
    </div>
    <div class="rightBox">
      <form @submit.prevent="submitform">
        <label for="voltage">Input Voltage</label>
        <input
          v-model="voltage"
          type="text"
          id="voltage"
          placeholder="Max: 230v  - Min: 220v"
        />
        <label for="voltage">Input Current</label>
        <input
          v-model="current"
          type="text"
          id="voltage"
          placeholder="Max: 2Amp  - Min: 1.95Amp"
        />
        <label for="voltage">Mohterboard Temp</label>
        <input
          v-model="temp"
          type="text"
          id="voltage"
          placeholder="Max: 60C  - Min: -10C"
        />
        <button @click="$bvModal.hide('ManualForm' + i)" type="submit">
          Add Entry
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import Axios from '@/methods/axiosInstance.js'

export default {
  data() {
    return {
      current: '',
      voltage: '',
      temp: ''
    }
  },
  props: { i: Number, equipment: String },
  methods: {
    async submitform(event) {
      try {
        const response = await Axios().post('/sethealth', {
          equipmentId: this.equipment,
          current: this.current,
          voltage: this.voltage,
          temperature: this.temperature
        })
        console.log("sethealt",response)
      } catch (error) {
        console.log('Error in that form', error)
      }
    }
  }
}
</script>

<style>
.manualData {
  padding: 30px;
  border-radius: 8px;
  background-color: #c3c3c3;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 30px;
  min-width: 300px;
  max-width: 550px;
  min-height: 400px;
  display: flex;
  justify-content: space-between;
}
.leftBox {
  flex-basis: 30%;
}
.rightBox {
  flex-basis: 70%;
}
.imageContainer img {
  width: 80%;
  max-width: 350px;
  min-width: 150px;
  margin: auto;
}
.rightBox form input {
  padding: 8px;
  margin: 10px 0;
  border: 1px solid #333;
  border-radius: 8px;
  width: 100%;
  font-size: 16px;
}
.rightBox form label {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 0;
}
.rightBox form button {
  background-color: #0d1b2a;
  border: none;
  border-radius: 8px;
  width: 200px;

  color: white;
  padding: 8px 12px;
  display: block;
  margin: auto;
  margin-top: 20px;
}
</style>
