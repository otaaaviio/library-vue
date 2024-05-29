<template>
  <v-col cols="12" md="6">
    <v-card-text class="mt-12">
      <h4
        class="text-center"
      >Login in to Your Account</h4>
      <h5
        class="text-center  grey--text "
      >Log in to your account so you can continue builiding <br>and editing your onboarding flows</h5>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8">

          <v-form ref="form" @submit.prevent="loginSubmit">
            <v-text-field
              label="Email"
              outlined
              dense
              color="blue"
              autocomplete="false"
              class="mt-16"
              v-model="user.email"
              :rules="[() => !!user.email || 'Email is required', () => /.+@.+\..+/.test(user.email) || 'E-mail must be valid']"
            />
            <v-text-field
              label="Password"
              outlined
              dense
              color="blue"
              autocomplete="false"
              :type="showPassword ? 'text' : 'password'"
              v-model="user.password"
              :rules="[() => !!user.password || 'Password is required', () => user.password.length >= 6 || 'Password must be 6 characters min']"
            />
            <v-row>
              <v-col cols="12" sm="7">
                <v-checkbox

                  label="Remember Me"
                  class="mt-n1"
                  color="blue"
                ></v-checkbox>
              </v-col>
            </v-row>
            <v-btn type="submit" color="blue" dark block tile>Log in</v-btn>
          </v-form>

          <h5
            class="text-center  grey--text mt-4 mb-3"
          >Or Log in using</h5>
          <div class="d-flex  justify-center align-center mx-10 mb-11">
            <v-btn depressed outlined color="grey">
              <v-icon color="red">fab fa-google</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-col>
</template>

<script lang="ts">
import 'vue3-toastify/dist/index.css';
import {useAppStore} from "../stores/app";
import {toast} from "vue3-toastify";
import axios from "axios";

const store = useAppStore();

export default {
  data: () => ({
    user: {
      email: null,
      password: null,
    },
    showPassword: false,
  }),
  methods: {
    async loginSubmit() {
      await axios.post( `http://localhost:4000/sessions/login`, this.user)
        .then((res) => {
          store.setUser(res.data.user);
          this.$router.push('/home').then(() => {
            toast.success("Login successful");
          });
        })
        .catch((err) => {
          console.log(err)
          if (err.response?.status === 404) toast.error("User not found")
          else if (err.response?.status === 401) toast.error("Invalid password")
          else toast.error("Login failed");
        });
    }
  }
}
</script>

<style scoped lang="sass">

</style>


