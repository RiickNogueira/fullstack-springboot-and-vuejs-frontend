<template>
  <v-dialog v-model="visible" persistent max-width="350">
    <v-card>
      <v-card-title class="headline">{{ header }}</v-card-title>
      <v-card-text>{{ message }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click.prevent="onCancel">Não</v-btn>
        <v-btn color="primary" @click.prevent="onConfirm">Sim</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ModalConfirmacao",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    header: {
      type: String,
      default: "",
    },
    message: {
      type: String,
      default: "",
    },
    onConfirm: { type: Function, default: () => {} },
    onCancel: { type: Function, default: () => {} },
  },
};
</script>
