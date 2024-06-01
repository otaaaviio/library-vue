<template>
  <v-dialog :value="dialogOpen" @input="$emit('update:dialogOpen', $event)" max-width="500">
    <v-card :title="title">
      <v-card-text>
        {{ $t('dialogConfirm') }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :text="$t('confirm')"
          @click="onClick"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
export default {
  props: {
    dialogOpen: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    onClick: {
      type: Function,
      default: () => {},
    },
  }
};
</script>
