<template>
  <Loader v-if="loading" />
  <div v-else class="wareContainer">
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
        <span>{{ search }}</span>
      </div>
      <div>
        Results Found :
        <span>{{ equipments.length }}</span>
      </div>
    </section>

    <section id="OrderContainer">
      <div>
        <h2>Results :</h2>
      </div>
      <div
        class="allOrders"
        v-for="(equipment, i) in equipments"
        :key="equipment.equipmentCode"
      >
        <div class="QueryNumber">{{ i + 1 }}</div>
        <section class="OrderCard">
          <div class="imageContainer">
            <img
              :src="require('@/assets/img/controller.jpeg')"
              alt="Engineer who completed this task"
            />
          </div>
          <div class="dataContainer">
            <div class="MakeFlex">
              <div>
                <p>
                  EquipmentCode :
                  <span>{{ equipment.equipmentCode }}</span>
                </p>
              </div>
              <div>
                <p>
                  Equipment No. :
                  <span>{{ equipment.equipmentNumber }}</span>
                </p>
              </div>
            </div>
            <div>
              <p>
                Description :
                <span>{{ equipment.description }}</span>
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
            <div class="ManualFormContainer">
              <b-button
                class="btn-sm btn-success"
                id="assign-btn"
                @click="$bvModal.show('ManualForm' + i)"
                >Add Manual Data
              </b-button>

              <b-modal :id="'ManualForm' + i" hide-footer>
                <ThatForm :equipment="equipment._id" :i="i"/>
              </b-modal>
            </div>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
import Axios from '@/methods/axiosInstance.js'
import Loader from '@/pages/Layout/Loader'
import ThatForm from '@/pages/ThatForm.vue'

export default {
  data() {
    return {
      equipments: [],
      searchQuery: '',
      search: 'All',
      searchNumber: '',
      numResults: '',
      loading: true
    }
  },
  components: {
    Loader,
    ThatForm
  },
  async mounted() {
    try {
      const { data } = await Axios().get('/equipment-list')
      this.equipments = data
      this.loading = false
      console.log('Data warehousing', data)
    } catch (error) {
      this.loading = false
      if (error.response && error.response.status === 401) {
        console.log(error.response)
        this.$router.push({ name: 'login' })
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
 .modal-dialog {
  max-width: 600px !important;
}
.wareContainer {
  background-color: #e0e1dd;
  padding: 8px;
  min-height: 100vh;
  position: relative;
}

.wareContainer > section {
  background-color: white;
  padding: 12px;
  margin: 10px;
  border-radius: 8px;
}
#searchingBox {
  background: #0d1b2a; /* fallback for old browsers */
  padding-bottom: 24px;
}
#queryContainer {
  padding: 16px 8px;
  border-radius: 8px;
  display: flex;
  flex-wrap: wrap;
  background-color: #ddd;
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
  border: 1px solid;
  width: 60%;
  min-width: 200px;
  margin: 10px 0;
  padding: 8px 8px;
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
  padding: 16px 8px;
  justify-content: space-between;
  background: #415a77; /* fallback for old browsers */
  margin: 32px 10px;
}
#resultParameter > div {
  padding: 8px;
  flex-basis: 45%;
  border-radius: 8px;
  min-height: 30px;
  color: white;
  font-weight: bold;
}
#OrderContainer {
  background: #1b263b; /* fallback for old browsers */
}
#OrderContainer h2 {
  color: #fff;
  font-size: 1.4rem;
}
.OrderCard {
  margin: 18px;
  border-radius: 8px;
  padding: 8px 0;
  min-height: 200px;
  background-color: #ddd;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.dataContainer {
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  min-height: 250px;
}
.OrderCard p {
  font-size: 16px;
  font-weight: 600;
  color: black;
}
.OrderCard p span {
  font-weight: 400;
  color: rgb(34, 34, 34);
}
.imageContainer {
  padding: 10px;
  padding-right: 15px;
  flex-basis: 20%;
  min-width: 100px;
  max-width: 400px;
}
.imageContainer img {
  width: 100%;
  height: 60% !important;
  border-radius: 10px;
  margin-top: 25%;
}
.dataContainer {
  flex-basis: 80%;
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
