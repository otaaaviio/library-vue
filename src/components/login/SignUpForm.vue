<template>
  <v-col cols="12" md="6">
    <v-card-text class="mt-12">
      <h4
        class="text-center"
      >{{ $t('sigUpForm.signUpForAccount') }}</h4>
      <h5 class="text-center  grey--text " v-html="$t('sigUpForm.letsSetUp')"/>
      <v-form class="d-flex justify-center align-center" @submit.prevent="signUpSubmit" ref="form">
        <v-col cols="12" sm="8">
          <v-text-field
            :label="$t('sigUpForm.name')"
            outlined
            v-model="user.name"
            dense
            autocomplete="false"
            :rules="[() => !!user.name || $t('errors.nameRequired')]"
          />
          <v-text-field
            label="Email"
            outlined
            v-model="user.email"
            dense
            autocomplete="false"
            :rules="[() => !!user.email || $t('errors.emailRequired'), () => /.+@.+\..+/.test(user.email) || $t('errors.emailValid')]"
          />
          <input-password
            :showPassword="showPassword"
            @click:append="showPassword = !showPassword"
            :password="user.password"
            v-model="user.password"
          />
          <input-password
            :showPassword="showConfirmPassword"
            @click:append="showConfirmPassword = !showConfirmPassword"
            :password="user.confirmPassword"
            v-model="user.confirmPassword"
          />
          <v-row>
            <v-checkbox
              :label="$t('sigUpForm.acceptTerms')"
              :v-model="acceptTerms"
              @input="acceptTerms = !acceptTerms"
              class="mt-n1"
            />
          </v-row>
          <v-btn type="submit" dark block tile>{{ $t('sigUpForm.signUp') }}</v-btn>
          <h5
            class="text-center  grey--text mt-4 mb-3"
          >{{ $t('sigUpForm.or') }}</h5>
          <google-btn/>
        </v-col>
      </v-form>
    </v-card-text>
  </v-col>
</template>

<script lang="ts">
import {toast} from "vue3-toastify";
import axios from "axios";

export default {
  data: () => ({
    user: {
      name: null,
      email: null,
      password: null,
      confirmPassword: null,
    },
    showPassword: false,
    showConfirmPassword: false,
    acceptTerms: false,
  }),
  methods: {
    async signUpSubmit() {
      if (this.verifyInputs()) {
        await axios.post(`http://localhost:4000/users/register`, {
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
        })
          .then((res) => {
            this.$router.push('/login').then(() => {
              toast.success("Register successful");
            });
          })
          .catch((err) => {
            console.log(err.response)
            if (err.response?.data.message === "Unique constraint failed on the fields: email")
              toast.error("User already exists")
            else toast.error("Register failed");
          });
      }
    },
    verifyInputs(): boolean {
      if (!this.user.name || !this.user.email || !this.user.password || !this.user.confirmPassword) {
        toast.error('Preencha todos os campos!');
        return false;
      }
      if (this.user.password !== this.user.confirmPassword) {
        toast.error(this.$t('errors.passwordMatch'));
        return false;
      }
      if (!this.acceptTerms) {
        toast.error(this.$t('errors.acceptTerms'));
        return false;
      }
      return this.$refs.form.validate();
    }
  },
}
</script>
