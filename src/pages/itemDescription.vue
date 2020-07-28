<template>
  <div class="body">
    <b-container class="bv-example-row">
    
      <b-row>
        <b-col cols="12" md="10" offset="1">
        <main id="main-box">
        <h2 class="heading">Item Description</h2>
 <div class="container content">
  <!-- Left Column / Headphones Image -->
  <div class="left-column">
    <img class="rounded" data-image="black" src="https://i1.wp.com/thepointsguy.com/wp-content/uploads/2019/05/1_DSC_3589.jpg?fit=1600%2C1065px&ssl=1" alt="">
  </div>
  <!-- Right Column -->
  <div class="right-column">
 
    <!-- Product Description -->
    <div class="item-description ">
      <span class="value eid">Equipment Id {{ info.equipmentId}}</span>
      <h1 class="value">Equipment Name {{info.assignmentNumber}}</h1>
      <p class="blockquote-footer value" style="#417500">Equipment Code{{ info.equipmentCode}}</p>
      <p class="description value">Equipment Description {{info.description}}  The preferred choice of a vast range of acclaimed DJs. Punchy, bass-focused sound and high isolation. Sturdy headband and on-ear cushions suitable for live performance</p>
      <p class="value" style="color:#8a1d07"><b>Assignment Code</b><span class="pull-right">712832</span></p>
      <p class="value" style="color:#7a0043"><b>Location</b><span class="pull-right">Ljkalsjoiawkljaoiwe</span></p>
      <b-button class="btn-sm btn-info" id="show-btn" @click="$bvModal.show('bv-modal-example')">Show Task List</b-button>
      <b-button class="btn-sm btn-success pull-right" id="assign-btn" @click="$bvModal.show('bv-modal-assign')">Assign To</b-button>

          <b-modal id="bv-modal-example" hide-footer>
              <template v-slot:modal-title>List of the tasks</template>
                <div class="d-block" id="tasklistBlock">
                  <h3>Tasks</h3>
                  <ul id="tasklist">
                    <li v-for="(task, index) in info.tasklist" :key="index">{{ task }}</li>
                  </ul>
                </div>
              <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">Done</b-button>
          </b-modal>

          <b-modal id="bv-modal-assign" hide-footer>
              <template class="header" v-slot:modal-title>Assign To:</template>
                <div class="d-block" id="tasklistBlock">
                  <h4>Engineers</h4>
                  <b-form-select
                    name="engiSelect"
                    :options="engineers"
                    option:selected = "Select Engineer"
                    size="sm"
                    class="mt-3"
                    value-field="engineerID"
                    text-field="name"
                    >
          <option value="Select Engineer"></option>
          <option value="engineerID"></option>
          </b-form-select>
          <b-form-textarea
          class="comments"
            id="textarea-rows"
            v-model="remarks"
            placeholder="Additional Remarks"
            rows="4"
          ></b-form-textarea>
                </div>
              <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">Assign</b-button>
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
import axios from 'axios'

export default {
  async mounted() {
    try {
      const { data: orderData } = await axios.get(
        `http://localhost:3000/order/${this.equipmentId}`,
        {
          headers: { authorization: this.$cookies.get('token') }
        }
      )
      this.info = orderData
      console.log('got the order', orderData)
      const { data: engiData } = await axios.get(
        `http://localhost:3000/engineers`,
        {
          headers: { authorization: this.$cookies.get('token') }
        }
      )
      this.engineers = engiData
      console.log('got the engi list', engiData)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        this.$router.push({ name: 'login' })
      }
      console.log(error)
    }
  },
  data() {
    return {
      info: {},
      equipmentId: this.$route.params.id,
      selected: 'default',
      options:[
        {text:'Select Engineer', value:'default'}
      ],
      engineers: [],
      remarks: null
    }
  },
  methods: {
    async assignEngineer() {
      try {
        const payLoad = {
          equipmentCode: this.info.equipmentCode,
          orderId: this.equipmentId,
          engineerID: this.selected,
          additionalRemarks: this.remarks || 'No remarks'
        }

        const response = await axios.post(
          'http://localhost:3000/submit-form',
          payLoad,
          {
            headers: { authorization: this.$cookies.get('token') }
          }
        )
        if (response.status === 200) {
            this.$router.push({ name: 'joblist' })
          
        } else {
          alert('Some Error Ocurred,Please submit again!')
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log("401 ocured in item description",error)
          this.$router.push({ name: 'login' })
        }
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>
.body{
  background-image:linear-gradient(rgba(0, 0, 0, 0.5),
                       rgba(0, 0, 0, 0.5)),url('/assets/images/Background/ItemDescription_BG.jpg');
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
.heading{
  line-height: 1.8;
    margin: 0;
    padding: 0;
    font-weight: bold;
    color: #222;
    font-family: 'Roboto Slab', serif;
    font-size: 25px;
    margin-bottom: 30px;
    text-transform: uppercase;
}
.row {
  width: 100% !important;
}
p {
  color: #3f4441;
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
    background-color: cadetblue;
    padding-bottom: 12px;
    padding-left: 24px;
}

#main-box{
 background-color:white;
 padding: 30px 40px 50px 40px;
 border-radius:10px;
 opacity:0.97;
}

.left-column {
  width: 65%;
  position: relative;
}
.right-column {
  width: 35%;
  margin-top: 10px;
}
.left-column img{
  width:95%;
  height:80%;
  margin-top:10%;
  border-radius:10px;
}
.item-description {

  margin-bottom: 20px;
}
.item-description .eid {
  font-size: 12px;
  color: #358ED7;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-decoration: none;
}
.item-description h1 {
  font-weight: 300;
  font-size: 38px;
  color: #43484D;
  letter-spacing: -2px;
}
.description{
  font-size: 16px;
  font-weight: 300;
  color: #86939E;
  line-height: 24px;
}
.blockquote-footer{
  font-size:14px;
  font-weight:300;
  color:green;
}
.assign{
  margin-top:20px;
}
.comments {
  border: 1px solid grey;
  padding: 6px 10px;
  width: 100%;
  border-radius: 10px 10px 10px 10px;
}
b-modal template{
  background-color:blue;
}
</style>
