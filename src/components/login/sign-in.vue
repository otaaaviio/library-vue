<template>
  <v-col cols="12" md="6">
    <v-card-text class="mt-12">
      <h4
        class="text-center"
      >{{ $t('loginInYourAccount') }}</h4>
      <h5 class="text-center  grey--text " v-html="$t('loginSubtitle')"/>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8">
          <v-form ref="form" @submit.prevent="loginSubmit">
            <v-text-field
              label="Email"
              outlined
              dense
              variant="outlined"
              color="blue"
              autocomplete="false"
              class="mt-16"
              v-model="user.email"
              :rules="[() => !!user.email || $t('emailRequired'), () => /.+@.+\..+/.test(user.email) || $t('emailInvalid')]"
            />
            <input-password
              :showPassword="showPassword"
              @click:append="showPassword = !showPassword"
              :password="user.password"
              v-model="user.password"
              :label="$t('password')"
            />
            <v-progress-linear class="mb-3 mt-3" height="1"></v-progress-linear>
            <v-btn type="submit" dark block tile>{{ $t('login') }}</v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-card-text>
  </v-col>
</template>

<script lang="ts">
import 'vue3-toastify/dist/index.css';
import InputPassword from "../utils/input-password.vue";
import {useAuthStore} from "../../stores";
import {ref} from 'vue';

export default {
  components: {InputPassword},
  data: () => ({
    user: {
      email: '',
      password: '',
    },
    showPassword: false,
    form: ref(null)
  }),
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  methods: {
    async loginSubmit() {
      const validator = await this.$refs.form.validate();
      if (validator.valid) {
        await this.authStore.login(this.user);
      }
    }
  }
}
</script>
