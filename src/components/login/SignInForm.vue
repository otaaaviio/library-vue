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
            <input-password
              :showPassword="showPassword"
              @click:append="showPassword = !showPassword"
              :password="user.password"
              v-model="user.password"
            />
            <v-progress-linear class="mb-3 mt-3" height="1"></v-progress-linear>
            <v-btn type="submit" dark block tile>{{ $t('login.loginButton') }}</v-btn>
          </v-form>
          <h5
            class="text-center  grey--text mt-4 mb-3"
          >{{ $t('login.or') }}</h5>
          <google-btn/>
        </v-col>
      </v-row>
    </v-card-text>
  </v-col>
</template>

<script lang="ts">
import 'vue3-toastify/dist/index.css';
import {useAppStore} from "../../stores/app";
import {toast} from "vue3-toastify";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import InputPassword from "./inputPassword.vue";

const store = useAppStore();

export default {
  components: {InputPassword, FontAwesomeIcon},
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
            this.$router.push('/books').then(() => {
              toast.success("Login successful");
            });
          })
          .catch((err) => {
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


