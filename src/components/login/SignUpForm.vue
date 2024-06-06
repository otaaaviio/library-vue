<template>
  <v-col cols="12" md="6">
    <v-card-text class="mt-12">
      <h4
        class="text-center"
      >{{ $t('register') }}</h4>
      <h5 class="text-center  grey--text " v-html="$t('letsSetUp')"/>
      <v-form class="d-flex justify-center align-center" @submit.prevent="signUpSubmit" ref="form">
        <v-col cols="12" sm="8">
          <v-text-field
            :label="$t('name')"
            variant="outlined"
            outlined
            v-model="user.name"
            dense
            autocomplete="false"
            :rules="[() => !!user.name || $t('nameRequired')]"
          />
          <v-text-field
            label="Email"
            variant="outlined"
            outlined
            v-model="user.email"
            dense
            autocomplete="false"
            :rules="[() => !!user.email || $t('emailRequired'), () => /.+@.+\..+/.test(user.email) || $t('emailInvalid')]"
          />
          <input-password
            :showPassword="showPassword"
            @click:append="showPassword = !showPassword"
            :password="user.password"
            v-model="user.password"
            :label="$t('password')"
          />
          <input-password
            :showPassword="showConfirmPassword"
            @click:append="showConfirmPassword = !showConfirmPassword"
            :password="user.confirmPassword"
            v-model="user.confirmPassword"
            :label="$t('passwordConfirmation')"
          />
          <v-row>
            <v-checkbox
              :label="$t('acceptTerms')"
              :v-model="acceptTerms"
              @input="acceptTerms = !acceptTerms"
              class="mt-n1"
            />
          </v-row>
          <v-btn type="submit" dark block tile>{{ $t('createAccount') }}</v-btn>
          <h5
            class="text-center  grey--text mt-4 mb-3"
          >{{ $t('orSignUpUsing') }}</h5>
          <google-btn/>
        </v-col>
      </v-form>
    </v-card-text>
  </v-col>
</template>

<script lang="ts">
import {toast} from "vue3-toastify";
import auth from "../../api/auth";

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
        await auth.actions.register(this.user)
          .then(() => {
            this.$emit('success');
          });
      }
    },
    verifyInputs(): boolean {
      if (!this.user.name || !this.user.email || !this.user.password || !this.user.confirmPassword) {
        toast.error(this.$t('allFieldsRequired'));
        return false;
      }
      if (this.user.password !== this.user.confirmPassword) {
        toast.error(this.$t('passwordMatch'));
        return false;
      }
      if (!this.acceptTerms) {
        toast.error(this.$t('notAcceptTerms'));
        return false;
      }
      return this.$refs.form.validate();
    }
  },
}
</script>
