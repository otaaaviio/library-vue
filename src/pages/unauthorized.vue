<template>
  <v-container class="d-flex align-center justify-center fill-height">
    <!-- Image of <a href="https://br.freepik.com/psd-gratuitas/robo-fofo-isolado_72447542.htm#fromView=search&page=1&position=1&uuid=3dbef724-8a01-4b06-8f69-bc20e6e3b2a7">Freepik</a> -->
    <img src="@/assets/unauthorized.png" alt="Image for page not found" class="w-25">
    <v-row>
      <v-col cols="12" sm="8" md="6">
        <v-row cols="6" class="align-baseline">
          <v-card-title class="headline font-weight-black text-h1 pa-0">401</v-card-title>
          <v-col>
            <v-card-title class="pa-0">Unauthorized</v-card-title>
          </v-col>
        </v-row>
        <v-card-text class="pa-0 mt-5 mb-5">
          {{ $t('unauthorized') }}
        </v-card-text>
        <v-btn class="btn" @click="goBack">{{ $t('do login to can access') }}</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
export default {
  name: 'Unauthorized',
  methods: {
    goBack() {
      this.$router.push('/login');
    },
  },
}
</script>
