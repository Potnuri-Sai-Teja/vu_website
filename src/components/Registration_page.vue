<template>
  <div id="register1">
    <div id="nav">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/Login_page">Login</router-link></li>
        <li><router-link to="/About_page">About US</router-link></li>
        <li><router-link to="/Contactus_page">Contact us</router-link></li>
      </ul>
    </div>
    <router-view />

    <div class="register-form new-register-form">
      <form @submit.prevent="registration1">
        <div class="form-group">
          <div class="label">
            <label> Username:</label>
          </div>
          <div class="input-form">
            <input type="text" name="username" v-model="username" required />
          </div>
        </div>
        <div class="form-group">
          <div class="label">
            <label> Password:</label>
          </div>
          <div class="input-form">
            <input
              type="password"
              name="password"
              v-model="password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
              required
            />
          </div>
        </div>
        <div class="form-group">
          <div class="label">
            <label> Confirm password:</label>
          </div>
          <div class="input-form">
            <input
              type="password"
              name="password1"
              v-model="password1"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
              required
            />
          </div>
        </div>
        <div class="form-group">
          <div class="label">
            <label> Languages : </label>
          </div>
          <div class="input-form">
            <input
              type="checkbox"
              value="telugu"
              v-model="language"
              name="language"
            />
          </div>
          <div>
            <label>Telugu</label>
            <input
              type="checkbox"
              value="hindi"
              v-model="language"
              name="language"
            />
            <label>HINDI</label>
            <input
              type="checkbox"
              value="english"
              v-model="language"
              name="language"
            />
            <label>English</label>
          </div>
        </div>
        <div class="form-group">
          <div class="label">
            <label> Gender : </label>
          </div>
          <div class="input-form">
            <input type="radio" class="pr-2" value="male" v-model="gender" name="gender" />
            <label for="one">MALE</label>

            <input type="radio" value="female" v-model="gender" name="gender" />
            <label for="two">FEMALE</label>
          </div>
        </div>
        <div class="form-group">
          <div class="label">
            <label> Address :</label>
          </div>
          <div class="input-form">
            <textarea v-model="address" name="address"></textarea>
          </div>
        </div>

        <div class="form-group">
          <div class="label">
            <label for="phone"> phone number:</label>
          </div>
          <div class="input-form">
            <input
              type="tel"
              name="phone"
              v-model="phone"
              pattern="[0-9]{4}[0-9]{4}[0-9]{2}"
              required
            />
          </div>
        </div>
        <div class="form-group">
          <div class="label">
            <label> emaild:</label>
          </div>
          <div class="input-form">
            <input type="email" name="emaild" v-model="emaild" required />
          </div>
        </div>
        <div class="register new-register-button">
        <input type="submit" class="submit-button" value="register" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      username: "",
      emaild: "",
      password: "",
      password1: "",
      language: [],
      gender: "",
      address: "",
      phone: "",
    };
  },
  created() {
    axios.defaults.baseURL = "http://localhost:5000";
  },
  methods: {
    async registration1() {
      if (this.password === this.password1) {
        axios
          .post("/register", {
            username: this.username,
            emaild: this.emaild,
            password: this.password,
            password1: this.password1,
            language: this.language,
            gender: this.gender,
            address: this.address,
            phone: this.phone,
          })
          .then((res) => {
            console.log(res.data.code);

            if (res.data.code == 200) {
              alert("Successfully registered");
              this.$router.push("/Login_page");
            } else if (res.data.code == 300) {
              alert("EMAIL ID EXIST");
              this.$router.push("/Registration_page");
            } else {
              alert("Failed to register");
              this.$router.push("/Registration_page");
            }
          });
      } else {
        alert("PASSWORD AND confirm NOT MATCHED");
        this.$router.push("/Registration_page");
      }
    },
  },
  // router.push({ name: 'user', params: { userId: '123' } })
};
</script>
<style lang="scss">
.register-form {
  box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
  width: 500px;
  height: 100%;
  margin: 0px auto;
  margin-top: 63px;
  border-radius: 5px;
  padding: 0px 0;
  background-color: #fff;
}
form {
  width: 100%;
}
.form-group {
  display: inline-flex;
  width: 100%;
  padding: 30px 0 10px 40px;
}
.label {
  width: 30%;
  display: flex;
    align-items: center;
}

.register{
      text-align: center;
    padding: 23px 0;
}
#register1 {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.new-register-form{
    padding: 0px 0 !important;
input{
      padding: 0 !important;
    width: auto !important;
}
}
.new-register-button{
  input{
    width: 105px !important;
    padding: 9px 0 !important;
  }
}
</style>
