<template>
  <div>
    <validation-observer ref="observer" v-slot="{ invalid }">
      <form @submit.prevent="submit">
        <v-toolbar flat>
          <v-toolbar-title>Editar Perfil</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn type="submit" :disabled="invalid" color="primary" class="mx-2">
            <v-icon left>mdi-content-save</v-icon>Atualizar
          </v-btn>

          <v-btn @click.prevent="voltar" class="mx-2">
            <v-icon left>mdi-backburger</v-icon>Voltar
          </v-btn>
        </v-toolbar>

        <v-text-field
          v-model="form.id"
          label="Id"
          disabled
          class="pa-2"
        ></v-text-field>
        <validation-provider v-slot="{ errors }" name="nome" rules="required">
          <v-text-field
            v-model="form.nome"
            :error-messages="errors"
            label="Nome"
            required
            class="pa-2"
          ></v-text-field>
        </validation-provider>
      </form>
    </validation-observer>
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
  created() {
    this.getPerfil();
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
    async getPerfil() {
      this.loading = true;
      try {
        const response = await axios.get(
          `${api}/perfis/${this.$route.params.id}`
        );
        this.form = { ...response.data };
      } catch (e) {
        this.$toasted.global.defaultError(e.response.data);
        this.voltar();
      } finally {
        this.loading = false;
      }
    },
    async submit() {
      try {
        this.loading = true;
        const response = await axios.put(
          `${api}/perfis/${this.$route.params.id}`,
          this.form
        );
        if (response.status == 204) {
          this.$toasted.global.defaultSuccess({
            message: "Perfil atualizado com sucesso!",
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
