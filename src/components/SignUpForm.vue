<template>
  <v-col cols="12" md="6">
    <v-card-text class="mt-12">
      <h4
        class="text-center"
      >{{ $t('sigUpForm.signUpForAccount') }}</h4>
      <h5 class="text-center  grey--text " v-html="$t('sigUpForm.letsSetUp')"/>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8">
          <v-text-field
            :label="$t('sigUpForm.name')"
            outlined
            dense
            color="blue"
            autocomplete="false"
          />
          <v-text-field
            label="Email"
            outlined
            dense
            color="blue"
            autocomplete="false"
          />
          <v-text-field
            :label="$t('sigUpForm.password')"
            outlined
            dense
            color="blue"
            autocomplete="false"
            type="password"
          />
          <v-row>
            <v-checkbox
              :label="$t('sigUpForm.acceptTerms')"
              class="mt-n1"
              color="blue"
            ></v-checkbox>
          </v-row>
          <v-btn color="blue" dark block tile>{{ $t('sigUpForm.signUp') }}</v-btn>

          <h5
            class="text-center  grey--text mt-4 mb-3"
          >{{ $t('sigUpForm.or') }}</h5>
          <div class="d-flex  justify-center align-center mx-10 mb-11">
            <v-btn depressed outlined color="grey">
              <v-icon color="red">fab fa-google</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-col>
</template>

<style scoped lang="sass">

</style>

<script>

</script>
