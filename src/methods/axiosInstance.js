import axios from 'axios'
import Vue from "vue";

import VueCookies from 'vue-cookies'
Vue.use(VueCookies);

function axiosInstance() {
    console.log("Vue cookie", Vue.$cookies.get('token') || undefined)
    return axios.create({
        baseURL: "https://ak11.herokuapp.com",
        headers: { authorization: Vue.$cookies.get('token') || undefined }
    })
}


export default axiosInstance