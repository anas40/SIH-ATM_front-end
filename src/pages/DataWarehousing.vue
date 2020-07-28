<template>
  <div class="wareContainer">
    <section id="searchingBox">
      <div class="headText">
        <p>Search for orders here :</p>
      </div>
      <div id="queryContainer">
        <div class="firstSearch">
          <label for="SearchQuery">Search via query:</label>
          <input
            v-model="searchQuery"
            @keyup.enter="changeHandler"
            type="text"
            placeholder="Enter Query"
            id="SearchQuery"
          />
        </div>
        <div class="secondSearch">
          <label for="SearchOrder">Search via Order No. :</label>
          <input
            v-model="searchNumber"
            @keyup.enter="changeHandler"
            type="text"
            id="SearchOrder"
            placeholder="Enter Order No."
          />
        </div>
      </div>
    </section>

    <section id="resultParameter">
      <div>
        Search Query :
        <span>{{search}}</span>
      </div>
      <div>
        Results Found :
        <span>{{equipments.length}}</span>
      </div>
    </section>

    <section id="OrderContainer">
      <div>
        <h2>Results :</h2>
      </div>
      <div class="allOrders" v-for="(equipment, i) in equipments" :key="equipment.equipmentCode">
        <div class="QueryNumber">{{i+1}}</div>
        <section class="OrderCard">
          <div class="imageContainer">
            <img :src="require('@/assets/img/new_logo.png')" alt="Engineer who completed this task" />
          </div>
          <div class="dataContainer">
            <div class="MakeFlex">
              <div>
                <p>
                  EquipmentCode :
                  <span>{{equipment.equipmentCode}}</span>
                </p>
              </div>
              <div>
                <p>
                  Equipment No. :
                  <span>{{equipment.equipmentNumber}}</span>
                </p>
              </div>
            </div>
            <div>
              <p>
                Description :
                <span>{{equipment.description}}</span>
              </p>
            </div>
            <div class="MakeFlex">
              <div>
                <p>
                  Manufacturer :
                  <span>Default</span>
                </p>
              </div>
              <div>
                <p>
                  Procurement Date :
                  <span>2020-07-18</span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      equipments: [],
      searchQuery: '',
      search: '',
      searchNumber: '',
      numResults: ''
    }
  },

  async mounted() {
    try {
      const { data } = await axios.get(`http://localhost:3000/equipment-list`, {
        headers: { authorization: this.$cookies.get('token') } })
      this.equipments = data
      console.log("Data warehousing",data)
    } catch (error) {
      if(error.response && error.response.status === 401){
        console.log(error.response)
        this.$router.push({name:'login'})
      }
      console.log(error)
    }
  },
  methods: {
    changeHandler(event) {
      // event.target.id === 'SearchQuery'?  : null
    }
  }
}
</script>

<style lang="css">
.wareContainer {
  background-image:linear-gradient(rgba(0, 0, 0, 0.8),
                       rgba(0, 0, 0, 0.8)),url('/assets/images/Background/Data_Warehousing_BG.jpg');
  background-repeat:no-repeat;
  background-attachment:fixed;
  background-size:cover;
  padding: 8px;
  min-height: 100vh;
}

.wareContainer > section {
  background-color: white;
  padding: 12px;
  margin: 10px;
  border-radius: 8px;
}
#searchingBox {
  background: #0f0c29;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #24243e, #302b63, #0f0c29);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #24243e, #302b63, #0f0c29); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
opacity:0.9;
}
#queryContainer {
  padding: 8px;
  border-radius: 8px;
  display: flex;
  flex-wrap: wrap;
  background: white;
  justify-content: space-evenly;
}
#queryContainer > div {
  flex-basis: 45%;
}
#queryContainer label {
  font-weight: 500;
  font-size: 13px;
  display: block;
}
.QueryNumber {
  color: white;
  font-weight: 600;
  position: relative;
  left: 20px;
}
.firstSearch input,
.secondSearch input {
  border-bottom: 1px solid;
  width: 60%;
  min-width: 200px;
  margin: 10px 0;
  padding: 4px 8px;
  border-radius: 8px;
  color: black;
  transition: all 0.3s ease;
}
.firstSearch input:focus,
.secondSearch input:focus,
.firstSearch input:active {
  border: none;
  border-bottom: 1px solid black !important;
  border-radius: 0;
}
.headText p {
  font-size: 1.2rem;
  color: #fff;
}
#resultParameter {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background: #4b6cb7;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #182848, #4b6cb7);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #182848, #4b6cb7); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
opacity:0.9;
}
#resultParameter > div {
  padding: 4px 8px;
  flex-basis: 45%;
  border-radius: 8px;
  min-height: 30px;
  background-color: white;
}
#OrderContainer {
  background: #2b5876;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #4e4376, #2b5876);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #4e4376, #2b5876); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
opacity:0.9;
}
#OrderContainer h2 {
  color: #fff;
  font-size: 1.4rem;
}
.OrderCard {
  margin: 18px;
  border-radius: 8px;
  padding: 8px 0;
  background-color: white;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.OrderCard p {
  font-weight: 600;
  color: black;
}
.OrderCard p span {
  font-weight: 400;
  color: rgb(34, 34, 34);
}
.imageContainer {
  flex-basis: 10%;
  min-width: 100px;
  max-width: 200px;
}
.imageContainer img {
  width: 100%;
  height: 100%;
}
.dataContainer {
  flex-basis: 85%;
}
.MakeFlex {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.MakeFlex > div {
  flex-basis: 50%;
}

@media (max-width: 600px) {
  #queryContainer > div {
    flex-basis: 100%;
    min-width: 220px;
  }
  .MakeFlex > div {
    flex-basis: 100%;
  }
  .firstSearch input,
  .secondSearch input {
    width: 100%;
  }
  #resultParameter > div {
    flex-basis: 100%;
    margin: 10px 0;
  }
  .OrderCard {
    margin: 0;
  }
  #searchingBox {
    padding: 6px;
    margin: 10px 0;
  }
  #resultParameter {
    margin: 10px 0;
  }
  #OrderContainer {
    margin: 10px 0;
    padding: 8px;
  }
  .imageContainer {
    margin-bottom: 18px;
  }
  .dataContainer {
    flex-basis: 100%;
    padding: 0 8px;
  }
  .dataContainer p {
    font-size: 12px;
  }
  .allOrders {
    margin: 12px 0;
  }
  .QueryNumber {
    position: static;
    text-align: center;
    margin: 10px 0;
  }
}
</style>