<template>
  <v-text-field
    :label="label"
    variant="outlined"
    outlined
    dense
    color="blue"
    :type="showPassword ? 'text' : 'password'"
    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
    :rules="[
        () => !!password || !required || $t('passwordRequired'),
        () => password.length >= 6 || !required || $t('passwordLength'),
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
    required: {
      type: Boolean,
      default: true
    }
  },
}
</script>
