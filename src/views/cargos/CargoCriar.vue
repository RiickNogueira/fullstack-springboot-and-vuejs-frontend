<template>
  <div>
    <form @submit.prevent="submit">
      <v-toolbar flat>
        <v-toolbar-title>Novo Cargo</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn type="submit" color="primary" class="mx-2">
          <v-icon left>mdi-content-save</v-icon>Salvar
        </v-btn>

        <v-btn @click.prevent="voltar" class="mx-2">
          <v-icon left>mdi-backburger</v-icon>Voltar
        </v-btn>
      </v-toolbar>

      <validation-observer ref="observer">
        <validation-provider v-slot="{ errors }" name="nome" rules="required">
          <v-text-field
            v-model="form.nome"
            :error-messages="errors"
            label="Nome"
            required
          ></v-text-field>
        </validation-provider>
      </validation-observer>
    </form>

    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import axios from "axios";
import { required } from "vee-validate/dist/rules";

import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "Campo {_field_} deve ser preenchido",
});
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      loading: false,
      form: { nome: "" },
    };
  },
  methods: {
    voltar() {
      this.$router.push({ name: "cargos" });
    },
    async submit() {
      try {
        this.loading = true;
        const response = await axios.post(
          "http://localhost:3000/cargos",
          this.form
        );
        if (response.status == 201) {
          this.voltar();
        }
      } catch (e) {
        alert(e.response.data.message);
      } finally {
        this.loading = false;
      }
      this.$refs.observer.validate();
    },
  },
};
</script>
