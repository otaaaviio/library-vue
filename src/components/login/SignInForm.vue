<template>
  <v-col cols="12" md="6">
    <v-card-text class="mt-12">
      <h4
        class="text-center"
      >{{ $t('login.title') }}</h4>
      <h5 class="text-center  grey--text " v-html="$t('login.subtitle')"/>
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
              :rules="[() => !!user.email || $t('errors.emailRequired'), () => /.+@.+\..+/.test(user.email) || $t('errors.emailValid')]"
            />
            <v-text-field
              :label="$t('login.passwordLabel')"
              outlined
              dense
              color="blue"
              autocomplete="false"
              :type="showPassword ? 'text' : 'password'"
              v-model="user.password"
              :rules="[() => !!user.password || $t('errors.passwordRequired'), () => user.password.length >= 6 || $t('errors.passwordLength')]"
            />
            <v-progress-linear class="mb-3 mt-3" height="1"></v-progress-linear>
            <v-btn type="submit" color="blue" dark block tile>{{ $t('login.loginButton') }}</v-btn>
          </v-form>

          <h5
            class="text-center  grey--text mt-4 mb-3"
          >{{ $t('login.or') }}</h5>
          <div class="d-flex  justify-center align-center mx-10 mb-11">
            <v-btn depressed outlined color="grey">
              <font-awesome-icon icon="google" />
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-col>
</template>

<script lang="ts">
import 'vue3-toastify/dist/index.css';
import {useAppStore} from "../../stores/App";
import {toast} from "vue3-toastify";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

const store = useAppStore();

export default {
  components: {FontAwesomeIcon},
  data: () => ({
    user: {
      email: null,
      password: null,
    },
    showPassword: false,
  }),
  methods: {
    async loginSubmit() {
      const validator = await this.$refs.form.validate();
      if (validator.valid) {
        await axios.post(`http://localhost:4000/sessions/login`, this.user)
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
}
</script>

<style scoped lang="sass">

</style>


