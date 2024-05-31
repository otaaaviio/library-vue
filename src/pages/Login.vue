<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10">
        <v-card class="elevation-6 mt-10">
          <v-window v-model="step">
            <v-window-item :value="1">
              <v-row>
                <sig-in-form/>

                <v-col cols="12" md="6" class="rounded-bl-xl bg-light-blue">
                  <div style="  text-align: center; padding: 180px 0;">
                    <v-card-text class="white--text">
                      <h3 class="text-center ">{{ $t('loginPage.dontHaveAccount') }}</h3>
                      <h5 class="text-center" v-html="$t('loginPage.letsGetYouSetUp')"/>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn tile outlined dark @click="step++">{{ $t('loginPage.signUp') }}</v-btn>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-window-item>
            <v-window-item :value="2">
              <v-row>
                <v-col cols="12" md="6" class="bg-light-blue rounded-br-xl">
                  <div style="  text-align: center; padding: 180px 0;">
                    <v-card-text class="white--text">
                      <h3 class="text-center ">{{ $t('loginPage.alreadySignedUp') }}</h3>
                      <h5 class="text-center"v-html="$t('loginPage.signInToRegister')"/>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn tile outlined dark @click="step--">{{ $t('loginPage.logIn') }}</v-btn>
                    </div>
                  </div>
                </v-col>
                <sig-up-form/>
              </v-row>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import sigUpForm from "../components/login/SignUpForm.vue";
import sigInForm from "../components/login/SignInForm.vue";

export default {
  components: {
    sigUpForm: sigUpForm,
    sigInForm: sigInForm
  },
  data: () => ({
    step: 1
  }),
  props: {
    source: String
  },
}
</script>

<style scoped>
.v-application .rounded-bl-xl {
  border-bottom-left-radius: 300px !important;
}

.v-application .rounded-br-xl {
  border-bottom-right-radius: 300px !important;
}
</style>
