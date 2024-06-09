<template>
  <v-card class="pa-5">
    <v-form ref="form" @submit.prevent="checkForm">
      <v-card-title class="d-flex justify-center">{{ $t('review') }}</v-card-title>
      <h5 class="ml-1" style="color: gray;">
        {{ $t('rating') }}
      </h5>
      <v-rating
        v-model="data.rating"
        active-color="amber-darken-1"
        color="amber-darken-1"
        density="compact"
        class="mb-5"
      />
      <v-textarea
        :label="$t('comment')"
        variant="outlined"
        color="blue"
        v-model="data.comment"
        :rules="[() => !!data.comment || $t('comment required')]"
      />
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :text="$t('save')" type="submit"/>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import {ref} from "vue";

export default {
  data() {
    return {
      data: {
        comment: '',
        rating: 0
      },
      form: ref(null)
    }
  },
  props: {
    handleConfirm: {
      type: Function,
      required: true
    }
  },
  methods: {
    async checkForm() {
      const validator = await this.$refs.form.validate();
      if (validator.valid) {
        this.handleConfirm(this.data);
      }
    }
  }
}
</script>
