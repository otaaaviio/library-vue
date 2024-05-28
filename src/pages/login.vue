<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10">
        <v-card class="elevation-6 mt-10">
          <v-window v-model="step">
            <v-window-item :value="1">
              <v-row>
                <sig-in-form/>

                <v-col cols="12" md="6" class="blue rounded-bl-xl">
                  <div style="  text-align: center; padding: 180px 0;">
                    <v-card-text class="white--text">
                      <h3 class="text-center ">Don't Have an Account Yet?</h3>
                      <h5
                        class="text-center"
                      >Let's get you all set up so you can<br>dive deeper into the library.</h5>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn tile outlined dark @click="step++">SIGN UP</v-btn>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-window-item>
            <v-window-item :value="2">
              <v-row>
                <v-col cols="12" md="6" class="blue rounded-br-xl">
                  <div style="  text-align: center; padding: 180px 0;">
                    <v-card-text class="white--text">
                      <h3 class="text-center ">Already Signed up?</h3>
                      <h5
                        class="text-center"
                      >Sig in to register books, leave reviews, and <br> fully engage with our library.</h5>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn tile outlined dark @click="step--">Log in</v-btn>
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

<script>

import sigUpForm from "../components/sigUpForm.vue";
import sigInForm from "../components/sigInForm.vue";

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
