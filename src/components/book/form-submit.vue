<template>
  <v-dialog v-model="dialogOpen" max-width="500">
    <v-card :title="$t(title)">
      <v-form ref="form" @submit.prevent="onSubmitForm(value)">
        <v-text-field
          variant="outlined"
          v-model="value"
          :label="$t('name')"
          outlined
          color="blue"
          class="ml-10 mr-10"
        />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :text="$t('save')"
            type="submit"
          />
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      dialogOpen: false,
    }
  },
  props: {
    title: {
      type: String,
      required: false
    },
    onSubmit: {
      type: Function,
      required: true
    },
    openDialog: {
      type: Boolean,
      required: false
    }
  },
  watch: {
    openDialog: {
      immediate: true,
      handler() {
        if (this.openDialog) {
          this.dialogOpen = true;
        }
      }
    }
  },
  methods: {
    onSubmitForm(value) {
      this.onSubmit(value);
      this.dialogOpen = false;
      this.$emit('formSubmitted', false);
      this.value = '';
    }
  }
}
</script>
