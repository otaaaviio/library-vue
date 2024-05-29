<template>
  <v-container class="d-flex align-center justify-center fill-height">
    <!-- Image of <a href="https://br.freepik.com/psd-gratuitas/robo-fofo-isolado_72447542.htm#fromView=search&page=1&position=1&uuid=3dbef724-8a01-4b06-8f69-bc20e6e3b2a7">Freepik</a> -->
    <img src="@/assets/not_found.png" alt="Image for page not found" class="w-25">
    <v-row>
      <v-col cols="12" sm="8" md="6">
        <v-row cols="6" class="align-baseline">
          <v-card-title class="headline font-weight-black text-h1 pa-0">404</v-card-title>
          <v-col>
            <v-card-title class="pa-0">Page not found!</v-card-title>
          </v-col>
        </v-row>
        <v-card-text class="pa-0 mt-5 mb-5">
          We couldn't find the page you were looking for.
        </v-card-text>
        <v-btn class="btn" @click="goBack">GO HOME</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'NotFound',
  methods: {
    goBack() {
      this.$router.push('/home');
    },
  },
}
</script>
