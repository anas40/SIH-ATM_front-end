<template>
  <Loader v-if="loading" />

  <div v-else class="body">
  
    <b-container class="bv-example-row">
      <b-row>
        <b-col cols="12" md="10" offset="1">
          <main id="main-box">
            <h2 class="heading">Item Description</h2>
            <div class="container content">
              <!-- Left Column / Headphones Image -->
              <div class="left-column">
                <img
                  class="rounded"
                  data-image="black"
                  src="https://i1.wp.com/thepointsguy.com/wp-content/uploads/2019/05/1_DSC_3589.jpg?fit=1600%2C1065px&ssl=1"
                  alt=""
                />
              </div>
              <!-- Right Column -->
              <div class="right-column">
                <!-- Product Description -->
                <div class="item-description ">
                  <span class="eid"
                    >Id : {{ info._id }}</span
                  >

                  <h1 class="equipmentName">
                    Name : {{ info.equipmentName.slice(0,20) }}
                  </h1>
                  <p class="value" >
                    Equipment: {{ info.equipmentCode }}
                  </p>
                  <p class="description value">
                    Description : {{ info.description }}
                  </p>

                  <p class="value" style="color:#fff">
                    Assignment Code :<span class="pull-right">{{info.equipmentCode}}</span>

                  </p>
                  <p class="value" style="color:#fff">
                    Location :
                    <span class="pull-right">{{info.location}}</span>
                  </p>
                  <p class="value" style="color:#fff">
                    <b>Deadline : </b
                    ><span class="pull-right">{{info.deadlineDate.slice(0,10)}}</span>
                  </p>
                  <b-button
                    class="btn-sm btn-info"
                    id="show-btn"
                    @click="$bvModal.show('tasklistModal')"
                    >Show Task List</b-button
                  >
                  <b-button
                    class="btn-sm btn-success pull-right"
                    id="assign-btn"
                    @click="$bvModal.show('assignModal')"
                    >Assign To : </b-button
                  >

                  <b-modal id="tasklistModal" hide-footer>
                    <template v-slot:modal-title>List of the tasks</template>
                    <div class="d-block" id="tasklistBlock">
                      <h3>Tasks</h3>
                      <ul id="tasklist">
                        <li v-for="(task, index) in info.tasklist" :key="index">
                          {{ task }}
                        </li>
                      </ul>
                    </div>
                    <b-button
                      class="mt-3"
                      block
                      @click="$bvModal.hide('tasklistModal')"
                      >Done</b-button
                    >
                  </b-modal>

                  <b-modal id="assignModal" hide-footer>
                    <template class="header" v-slot:modal-title
                      >Assign To:</template
                    >
                    <div class="d-block" id="tasklistBlock">
                      <h4>Engineers</h4>
                      <b-form-select
                        name="engiSelect"
                        :options="engineers"
                        option:selected="selected"
                        size="sm"
                        v-model="selected"
                        class="mt-3"
                        value-field="engineerID"
                        text-field="name"
                      >
                      </b-form-select>
                      <b-form-textarea
                        class="comments"
                        id="textarea-rows"
                        v-model="remarks"
                        placeholder="Additional Remarks"
                        rows="4"
                      ></b-form-textarea>
                    </div>
                    <b-button class="mt-3" block @click="assignEngineer"
                      >Assign</b-button
                    >
                  </b-modal>
                </div>
              </div>
            </div>
          </main>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Axios from '@/methods/axiosInstance.js'
import axios from 'axios'
import Loader from '@/pages/Layout/Loader'

export default {
  data() {
    return {
      info: {},
      equipmentId: this.$route.params.id,
      selected: 'default',
      options: [{ text: 'Select Engineer', value: 'default' }],
      engineers: [],
      remarks: null,
      loading: true
    }
  },
  components:{
    Loader
  },
  async mounted() {
    try {
      
      const getOrder = () => Axios().get(`/order/${this.equipmentId}`)
      const getEngineerList = () => Axios().get(`/engineers`)

      axios.all([getOrder(), getEngineerList()]).then(
        axios.spread(({ data: orderData }, { data: engiData }) => {
          this.info = orderData
          console.table(orderData)
          this.engineers = engiData
          console.table(engiData)
          this.loading = false
        })
      )
    } catch (error) {
      this.loading = false
      if (error.response && error.response.status === 401) {
        this.$router.push({ name: 'login' })
      }
      console.log(error)
    }
  },
  methods: {
    async assignEngineer() {
      try {
        this.loading = true
        const payLoad = {
          equipmentCode: this.info.equipmentCode,
          orderId: this.equipmentId,
          engineerID: this.selected,
          additionalRemarks: this.remarks || 'No remarks'
        }
        console.log(payLoad)
        const response = await Axios().post('/submit-form', payLoad)
        if (response.status === 200) {
          this.$bvModal.hide('assignModal')
          this.loading = false
          this.$router.push({ name: 'Superintendent' })
        } else {
          this.loading = false
          alert('Some Error Ocurred,Please submit again!')
        }
      } catch (error) {
        this.loading = false
        if (error.response && error.response.status === 401) {
          console.log('401 ocured in item description', error)
          this.$router.push({ name: 'login' })
        }
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>
.body {
  background-color:#e0e1dd;
 
  padding: 60px 0;
  font-family: 'Roboto Slab';
  font-size: 13px;
  line-height: 1.8;
  color: black;
  font-weight: 400;
}


.heading {
  line-height: 1.8;
  margin: 0;
  padding: 0;
  font-weight: bold;
  color: #e0e1dd;
  font-family: 'Roboto Slab', serif;
  font-size: 25px;
  margin-bottom: 30px;
  text-transform: uppercase;
}
.row {
  width: 100% !important;
}
p {
  color: #fff;
}
#tasklistBlock {
  width: 80%;
  margin: auto;
}
#tasklistBlock > h3 {
  margin-left: 10px;
}

#textarea-rows {
  margin-top: 1.5rem;
}
.modal-content .modal-header {
  border-bottom: none;
  padding-top: 12px;
  padding-right: 24px;
  background-color: #fff;
  padding-bottom: 12px;
  padding-left: 24px;
}

#main-box {
  background-color: #0d1b2a;
  padding: 30px 40px 50px 40px;
  border-radius: 10px;
  opacity: 0.97;
}

.left-column {
  width: 50%;
  position: relative;
}
.right-column {
  width: 50%;
  margin-top: 10px;
}
.left-column img {
  width: 95%;
  max-width: 400px;
  /* height: 80%; */
  margin-top: 10%;
  border-radius: 10px;
}
.item-description {
  margin-bottom: 20px;
}
.item-description .eid {
  font-size: 12px;
  color: #778da9;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-decoration: none;
}
.item-description h1 {
  font-weight: 400;
  font-size: 16px;
  color: #fff;
  
}
.description {
  font-size: 16px;
  font-weight: 300;
  color: #fff;
  line-height: 24px;
}
.blockquote-footer {
  font-size: 14px;
  font-weight: 300;
  color: #fff;
}
.assign {
  margin-top: 20px;
}
.comments {
  border: 1px solid grey;
  padding: 6px 10px;
  width: 100%;
  border-radius: 10px 10px 10px 10px;
}
b-modal template {
  background-color: blue;
}
</style>
