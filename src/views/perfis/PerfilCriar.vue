<template>
  <div>
    <validation-observer ref="observer" v-slot="{ invalid }">
      <form @submit.prevent="submit">
        <v-toolbar flat>
          <v-toolbar-title>Novo Perfil</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn type="submit" :disabled="invalid" color="primary" class="mx-2">
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
              class="pa-2"
            ></v-text-field>
          </validation-provider>
        </validation-observer></form
    ></validation-observer>

    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import axios from "axios";
import { required } from "vee-validate/dist/rules";
import { api } from "@/global";

import { extend, ValidationObserver, ValidationProvider } from "vee-validate";

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
      form: {},
    };
  },
  methods: {
    voltar() {
      this.$router.push({ name: "perfis" });
    },
    async submit() {
      try {
        this.loading = true;
        const response = await axios.post(`${api}/perfis`, this.form);
        if (response.status == 201) {
          this.$toasted.global.defaultSuccess({
            message: "Perfil criado com sucesso!",
          });
          this.voltar();
        }
      } catch (e) {
        this.$toasted.global.defaultError(e.response.data);
      } finally {
        this.loading = false;
      }
      this.$refs.observer.validate();
    },
  },
};
</script>
