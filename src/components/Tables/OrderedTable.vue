<template>
  <div>
    <div class="md-layout-item">
      <md-field>
        <label for="list">List</label>
        <md-select v-model="list" name="list" id="list">
          <md-option value="3 month">3 month</md-option>
          <md-option value="6 month">6 month</md-option>
          <md-option value="yearly">yearly</md-option>
        </md-select>
      </md-field>
    </div>
    <b-table striped hover :fields="fields" :items="items">
      <template v-slot:cell(name)="data">
        <router-link :to="`/joblist/${data.item._id}`">{{
          data.value
        }}</router-link>
      </template>
    </b-table>
  </div>
</template>

<script>
import Axios from '@/methods/axiosInstance.js'

export default {
  mounted() {
    Axios().get('/get-orders')
      .then(response => (this.items = response.data))
      .catch(er => {
        console.log('Fetch Error:', er)
      })
  },

  data() {
    return {
      list: '3 month',
      fields: [
        {
          key: 'name',
          label: 'Code',
          formatter(value, key, item) {
            return item.equipmentCode
          }
        },
        'assignmentCode',
        'completed',
        {
          key: 'number',
          label: 'Order No.'
        },
        {
          key: 'work',
          label: 'description'
        },
        'status',
        'location',
        'cycle'
      ],
      items: []
    }
  }
}
</script>
