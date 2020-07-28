<template>
  <div class="body">
    <b-container class="bv-example-row">
      <b-row>
        <b-col cols="12" md="8" offset="2" id="main-box">
          <h2>Approval Form</h2>
          <div class="form-group-1">
            <input type="number" id="input-1" label="Assignment Number" v-model="info.assignmentNumber" placeholder="Assignment Code" disabled>
            <input type="number" id="input-2" label="Equipment Id" v-model="info.equipmentId" placeholder="Equipment ID" disabled>
            <input type="number" id="input-3" label="Equipment Code" v-model="info.equipmentCode" placeholder="Equipment Code" disabled>
            <input type="text" id="input-4" label="Equipment Name" v-model="info.equipmentName" placeholder="Equipment Name" disabled>
            <input type="text" id="input-5" label="Description" v-model="info.description" placeholder="Description" disabled>
            <input type="number" id="input-6" label="Location" v-model="info.location" placeholder="Location" disabled>
            <div>
              <b-button
                class="button"
                variant="primary"
                id="show-btn"
                @click="$bvModal.show('bv-modal-example')"
                >Show Task List</b-button
              >

              <b-modal id="bv-modal-example" hide-footer>
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
                  class="mt-3 button"
                  block
                  @click="$bvModal.hide('bv-modal-example')"
                  >Done</b-button
                >
              </b-modal>
            </div>
          </div>
          <hr />
          <div class="form-group-2">
            <input type="text" id="engi-1" label="Engineer Department" v-model="info.engineerDepartment" placeholder="Department" disabled>
            <input type="number" id="engi-2" label="Engineer Id" v-model="info.engineerId" placeholder="Engineer ID" disabled>
            <input type="text" id="engi-3" label="Engineer Name" v-model="info.engineerName" placeholder="Name" disabled>
            <input type="text" id="engi-4" label="Engineer Email" v-model="info.engineerEmail" placeholder="Email Id" disabled>
            <input type="number" id="engi-5" label="Engineer Phone" v-model="info.engineerPhone" placeholder="Phone Number" disabled>
          </div>
          <hr />
          <div class="status blockquote form-group-3">
            <h6 class="mb-0">
              Opened on
              <span class="pull-right">Closed on</span>
            </h6>
            <footer class="blockquote-footer" style="padding-top:0px">
              3/10/20
              <span class="pull-right">03/10/20</span>
            </footer>
          </div>

          <div class="form-group-4">
            <div class="justification card box">
            <h3 class="card-title" style="padding:5px; margin-left:10px">
              <i class="far fa-file-alt"></i> Justification
            </h3>
            <b-container class="bv-example-row">
              <div class="card-body">
                <b-row>
                  <b-col>
                    <div class="card">
                      <img
                        class="card-img-top"
                        height="50%"
                        src="@/assets/img/Placeholder/Approval_Form1.jpg"
                      />
                      <div class="card-body">
                        <h5 class="card-title">Description</h5>
                        <p class="card-text">
                          Some quick example text to build on the card title and
                          make up the bulk of the card's content.
                        </p>
                        <b-button
                          class="button"
                          variant="info"
                          id="view-btn"
                          @click="$bvModal.show('bv-more-info1')"
                        >View more</b-button>

                          <b-modal id="bv-more-info1" hide-footer>
                            <template v-slot:modal-title>Description</template>
                            <div class="d-block" id="moreInfoBlock">
                              <p>
                                Some quick example text to build on the card
                                title and make up the bulk of the card's
                                content.
                              </p>
                            </div>
                            <b-button
                              class="mt-3"
                              block
                              @click="$bvModal.hide('bv-more-info1')"
                              >Done</b-button
                            >
                          </b-modal>
                        </div>
                      </div>
                    </b-col>
                    
                  </b-row>
                </div>
              </b-container>
            </div>

            <div class="approval card box">
              <h3
                class="card-title content"
                style="padding:5px; margin-left:10px"
              >
                <img :src="require(`@/assets/img/approval.png`)" /> Approval
              </h3>
              <b-container class="bv-example-row card-body content">
                <b-row>
                  <b-col>
                    <div>
                      <b-form-radio
                        class="cb"
                        id="radio-pass"
                        v-model="status"
                        name="radiobox"
                      >
                        Pass
                        <i class="fas fa-check-circle"></i>
                      </b-form-radio>
                    </div>
                  </b-col>
                  <b-col>
                    <div class="card">
                      <img
                        class="card-img-top"
                        height="50%"
                        src="@/assets/img/Placeholder/Approval_Form2.webp"
                      />
                      <div class="card-body">
                        <h5 class="card-title">Description</h5>
                        <p class="card-text">
                          Some quick example text to build on the card title and
                          make up the bulk of the card's content.
                        </p>
                        <b-button
                          class="button"
                          variant="info"
                          id="view-btn"
                          @click="$bvModal.show('bv-more-info2')"
                        >View more</b-button>

                        <b-modal id="bv-more-info2" hide-footer>
                          <template v-slot:modal-title>Description</template>
                          <div class="d-block" id="moreInfoBlock">
                            <p>
                              Some quick example text to build on the card title
                              and make up the bulk of the card's content.
                            </p>
                          </div>
                          <b-button class="mt-3" block @click="$bvModal.hide('bv-more-info2')">Done</b-button>
                        </b-modal>
                      </div>
                    </div>
                  </b-col>
                </b-row>
              </b-container>
              <div class="remarks card-body">
                <b-form-textarea
                  id="textarea"
                  v-model="remarks"
                  placeholder="Additional Remarks"
                  rows="5"
                  margin="5px"
                ></b-form-textarea>
              </div>
            </div>

            <!-- On clicking approveReport function is called -->
            <b-button
              class="pull-right mt-2 mb-2 button"
              @click="approveReport"
              variant="primary"
              >Submit</b-button
            >
          </div>
        </b-col>
      </b-row>
    </b-container>

    <b-container class="bv-example-row">
      <!-- Stack the columns on mobile by making one full-width and the other half-width -->
      <b-row>
        <b-col cols="12" md="8" offset="2"></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
const axios = require('axios')

export default {
  data() {
    return {
      images: [],
      status: '',
      info: {},
      equipmentId: this.$route.params.id,
      selected: null,
      engineers: [],
      remarks: null
    }
  },
  methods: {
    bufferToBase64(imageArray) {
      imageArray.forEach(image => {
        const url = btoa(
          new Uint8Array(image.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        )
        let imageString = 'data:image/png;base64,'
        let newUrl = imageString.concat(url)
        this.images.push(newUrl)
      })
    }
  },
  async mounted() {
    try {
      //first get request to fetch order details
      const {
        data: orderData
      } = await axios.get(
        `http://localhost:3000/approval-form/${this.equipmentId}`,
        { headers: { authorization: this.$cookies.get('token') } }
      )
      this.info = orderData
      console.log('Order Data', orderData)
      const { data: engiData } = await axios.get(
        'http://localhost:3000/engineers',
        {
          headers: { authorization: this.$cookies.get('token') }
        }
      )
      this.engineers = engiData
      this.engineers.unshift({
        engineerID: null,
        name: 'Select the engineer',
        disabled: true
      })

      this.bufferToBase64(this.info.images)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        this.$router.push({ name: 'login' })
      }
      console.log(error)
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;700&display=swap');
.body{
  background-image:linear-gradient(rgba(0, 0, 0, 0.3),
                       rgba(0, 0, 0, 0.3)),url('/assets/images/Background/Approval_Form_BG.jpg');
  background-repeat:no-repeat;
  background-attachment:fixed;
  background-size:cover;
  padding: 60px 0;
  font-family: 'Roboto Slab';
  font-size: 13px;
  line-height: 1.8;
  color: black;
  font-weight: 400;
}

jumbotron .btn {
  margin-top: 50px !important;
}
.row {
  width: 100% !important;
}
#tasklistBlock {
  width: fit-content;
  margin: auto;
}
#tasklistBlock > h3 {
  margin-left: 10px;
}
#textarea {
  border: 1px solid grey;
  padding: 6px 10px;
  width: 100%;
  border-radius: 10px 10px 10px 10px;
}
#textarea-rows {
  margin-top: 1.5rem;
}
#show-btn {
  display: block;
  margin: auto;
}
.blockquote-footer::before {
  content: '';
}
.md-theme-default a:not(.md-button) {
  color: white;
}
h3,
h4,
h5,
h6 {
  font-family: 'Roboto Slab';
}
.card-img-top {
  width: 100%;
  height: 15vw;
  object-fit: cover;
}
.box {
  box-shadow: 5px 5px 10px #888888;
}
.approval {
  margin-top: 2rem;
  background-image: linear-gradient(rgba(0, 0, 50, 0.5), rgba(0, 0, 0, 0.1));
  font-size: 14px;
}
.justification {
  background-image: linear-gradient(rgba(50, 0, 0, 0.5), rgba(0, 0, 0, 0.1));
}
.content {
  margin-bottom: 0px;
  padding-bottom: 0px;
}
#main-box {
  background-color: white;
  padding: 50px 60px 70px 60px;
  border-radius: 10px;
  opacity: 0.98;
}
h2 {
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
h3 {
  font-weight: bold;
  color: #222;
  font-size: 20px;
  margin: 0px;
  margin-top: 20px;
  margin-bottom: 10px;
  text-transform: uppercase;
}
input {
  width: 100%;
  display: block;
  border: none;
  border-bottom: 2px solid #ebebeb;
  padding: 5px 0;
  color: #222;
  margin-bottom: 31px;
  font-family: 'Roboto Slab';
}
hr {
  margin-bottom: 40px;
  margin-top: 40px;
  border: 0;
  height: 1px;
  box-shadow: 0 40px 40px -40px red;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.75),
    rgba(0, 0, 0, 0)
  );
}
.button {
  box-shadow: 5px 5px 10px #888888;
}
</style>
