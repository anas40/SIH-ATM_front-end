<template>
  <div class="body">
    <div class="container">
      <div class="container-login100 content">
        <div class="panel-blur"></div>
        <div class="wrap-login100 panel p-l-110 p-r-110 p-t-62 p-b-33">
          <form class="login100-form validate-form flex-sb flex-w">
            <div class="logo p-b-20">
              <img class="logo-image p-b-10" src="assets/images/AAI.png" />
              <h5 style="color:#3c4ba7">AIRPORTS AUTHORITY OF INDIA</h5>
            </div>
            <span class="login100-form-title p-b-10">Sign In</span>
            <div class="p-t-31 p-b-9">
              <span class="txt1">Username</span>
            </div>
            <div
              class="wrap-input100 validate-input"
              data-validate="Username is required"
            >
              <input
                class="input100"
                v-model="name"
                type="text"
                name="username"
                placeholder="Example4u"
              />
              <span class="focus-input100"></span>
            </div>

            <div class="p-t-13 p-b-9">
              <span class="txt1">Password</span>

              <a href="#" class="txt2 bo1 m-l-5">Forgot?</a>
            </div>
            <div
              class="wrap-input100 validate-input"
              data-validate="Password is required"
            >
              <input
                class="input100"
                v-model="password"
                type="password"
                name="pass"
                placeholder="!##@!##"
              />
              <span class="focus-input100"></span>
            </div>

            <div class="container-login100-form-btn m-t-17">
              <button class="login100-form-btn" @click.prevent="loginMe()">
                Sign In
              </button>
            </div>

            <div class="w-full text-center p-t-55">
              <span class="txt2">Not a member?</span>

              <a href="#" class="txt2 bo1">Sign up now</a>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div id="dropDownSelect1"></div>

    <!--  -->
  </div>
</template>

<script>
import Axios from '@/methods/axiosInstance.js'
export default {
  name: 'login',
  data() {
    return {
      name: '',
      password: ''
    }
  },
  mounted() {
    if (this.$cookies.isKey('token')) {
      Axios().post('/verify')
        .then(res => {
          if (res.status === 200) {
            this.$router.push({ name: 'dashboard' })
          }
        })
        .catch(e => {
          console.log('Do the login')
        })
    }
  },
  methods: {
    // dashboard(){
    // this.$router.push({ path: '/dashboard' });
    loginMe() {
      Axios().post('/login', {
        email: this.name,
        password: this.password
      })
        .then(res => {
          //redirecting and setup of a cookie return with jwt
          if (res.status === 200) {
            console.log(res.data)
            this.$cookies.set('token', res.data.token)
            this.$router.push({ name: 'dashboard' })
          }
        })
        .catch(er => console.log(er))
    }
  }
}
</script>
<style lang="css" scoped>

.loginWays {
  /* color:white !important; */
}
.body {
  position: relative;
  background: url('/assets/images/airplane.jpeg') no-repeat center fixed;
  background-size: 100% 100%;
  overflow-y: auto;
  color: white;
  @media screen and (min-width: 768px) {
    min-height: 100%;
    height: auto;
    max-height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-y: visible;
  }
}

.logo {
  margin-left: auto;
  margin-right: auto;
}
.logo-image {
  margin-left: 70px;
  margin-right: auto;
  height: 5em;
}
.panel_blur,
.panel {
  background-color: hsl(20, 100%, 76%);
  width: 60%;
  height: 100%;
  overflow-y: auto;
  @media screen and (min-width: 768px) {
    width: 350px;
    height: 500px;
    overflow-y: visible;
  }
}

.panel {
  position: relative;
  z-index: 1;
  &__register-form,
  &__password-form {
    display: none;
  }
  &__register-form .form__submit {
    margin-top: 5px !important;
  }
  &__wrap-login100 {
    width: 100%;
    height: 100%;
    padding: 10%;
    background-color: rgba(0, 0, 0, 0.5);
    overflow-y: auto;
    @media screen and (min-width: 768px) {
      padding: 10% 15%;
      border-radius: 10px;
      overflow-y: visible;
    }
  }
}
</style>
