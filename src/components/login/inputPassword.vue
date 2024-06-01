<template>
  <v-text-field
    :label="label"
    outlined
    dense
    color="blue"
    autocomplete="false"
    :type="showPassword ? 'text' : 'password'"
    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
    :rules="[
        () => !!password || $t('passwordRequired'),
        () => password.length >= 6 || $t('passwordLength'),
    ]"
  />
</template>

<script lang="ts">
export default {
  props: {
    showPassword: {
      type: Boolean,
      default: false
    },
    password: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
  }
}
</script>

<style scoped>

</style>
