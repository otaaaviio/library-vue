<template>
  <v-container >
    <v-row align="center" justify="center">
      <v-card class="elevation-6 mt-10 z-index-2" :style="{ width: '500px' }">
        <v-col>
          <v-card-text class="mt-12">
            <h4
              class="text-center"
            >{{ $t('accountManage') }}</h4>
            <h5 class="text-center" v-html="$t('accountOptions')"/>
            <v-form class="d-flex justify-center align-center" @submit.prevent="signUpSubmit" ref="form">
              <v-col>
                <v-text-field
                  :label="$t('name')"
                  outlined
                  v-model="user.name"
                  dense
                  autocomplete="false"
                  :rules="[v => (/^[a-zA-Z]*$/.test(v)) || $t('nameInvalid')]"
                />
                <v-text-field
                  label="Email"
                  outlined
                  v-model="user.email"
                  dense
                  autocomplete="false"
                  :rules="[() => !user.email || /.+@.+\..+/.test(user.email) || $t('emailInvalid')]"
                />
                <input-password
                  :showPassword="showPassword"
                  @click:append="showPassword = !showPassword"
                  :password="user.password"
                  v-model="user.password"
                  :required="false"
                  :label="$t('password')"
                />
                <input-password
                  :showPassword="showConfirmPassword"
                  @click:append="showConfirmPassword = !showConfirmPassword"
                  :password="user.confirmPassword"
                  :required="false"
                  v-model="user.confirmPassword"
                  :label="$t('passwordConfirmation')"
                />
                <v-btn type="submit" dark block tile>{{ $t('save') }}</v-btn>
              </v-col>
            </v-form>
          </v-card-text>
        </v-col>
      </v-card>

    </v-row>
  </v-container>
</template>

<script lang="ts">

export default {
  data: () => ({
    user: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    showPassword: false,
    showConfirmPassword: false,
    acceptTerms: false
  }),
  methods: {
    signUpSubmit() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('auth/signUp', this.user);
      }
    }
  }

}
</script>


