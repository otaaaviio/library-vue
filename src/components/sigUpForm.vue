<template>
  <v-col cols="12" md="6">
    <v-card-text class="mt-12">
      <h4
        class="text-center"
      >Sign Up for an Account</h4>
      <h5
        class="text-center  grey--text "
      >Let's set you up to start your first onboarding experience.<br>
        Let's begin!</h5>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8">
          <v-text-field
            label="Name"
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
            label="Password"
            outlined
            dense
            color="blue"
            autocomplete="false"
            type="password"
          />
          <v-row>
            <v-checkbox
              label="I Accept Terms & Conditions"
              class="mt-n1"
              color="blue"
            ></v-checkbox>
          </v-row>
          <v-btn color="blue" dark block tile>Sign up</v-btn>

          <h5
            class="text-center  grey--text mt-4 mb-3"
          >Or Sign up using</h5>
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
