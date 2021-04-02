<template>
  <div>
    <validation-observer ref="observer" v-slot="{ invalid }">
      <form @submit.prevent="submit">
        <v-toolbar flat>
          <v-toolbar-title>Editar Usuario</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn type="submit" :disabled="invalid" color="primary" class="mx-2">
            <v-icon left>mdi-content-save</v-icon>Atualizar
          </v-btn>

          <v-btn @click.prevent="voltar" class="mx-2">
            <v-icon left>mdi-backburger</v-icon>Voltar
          </v-btn>
        </v-toolbar>
        <v-row justify="space-between">
          <v-col cols="12" md="2">
            <v-text-field
              v-model="form.id"
              label="Id"
              disabled
              class="pa-2"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="10">
            <validation-provider
              v-slot="{ errors }"
              name="nome"
              rules="required"
            >
              <v-text-field
                v-model="form.nome"
                :error-messages="errors"
                label="Nome"
                required
                class="pa-2"
              ></v-text-field>
            </validation-provider> </v-col
        ></v-row>
        <v-row justify="space-between">
          <v-col cols="12" md="4">
            <validation-provider
              v-slot="{ errors }"
              name="cpf"
              rules="required"
            >
              <v-text-field
                v-model="form.cpf"
                :error-messages="errors"
                label="CPF"
                v-mask="'###.###.###-##'"
                return-masked-value
                required
                class="pa-2"
              ></v-text-field>
            </validation-provider>
          </v-col>
          <v-col cols="12" md="4"
            ><v-text-field
              v-model="form.dataNascimento"
              label="Data de Nascimento"
              class="pa-2"
              v-mask="'##/##/####'"
              return-masked-value
            ></v-text-field></v-col
          ><v-col cols="12" md="4"
            ><v-select
              v-model="form.sexo"
              item-text="descricao"
              item-value="abreviacao"
              label="Sexo"
              :items="sexoOpcoes"
              class="pa-2"
            ></v-select></v-col
        ></v-row>
        <validation-provider v-slot="{ errors }" name="cargo" rules="required">
          <v-select
            v-model="form.cargo"
            :items="cargoOpcoes"
            :error-messages="errors"
            item-text="nome"
            item-value="id"
            return-object
            label="Cargo"
            required
            data-vv-name="cargo"
            class="pa-2"
          ></v-select>
        </validation-provider>
        <v-select
          v-model="form.perfis"
          :items="perfisOpcoes"
          item-text="nome"
          item-value="id"
          return-object
          multiple
          label="Perfis"
          class="pa-2"
        ></v-select>
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
  data() {
    return {
      loading: false,
      form: { cargo: null, perfis: null },
      sexoOpcoes: [
        { abreviacao: "M", descricao: "Masculino" },
        { abreviacao: "F", descricao: "Feminino" },
      ],
      cargoOpcoes: [],
      perfisOpcoes: [],
    };
  },
  created() {
    this.getUsuario();
    this.buscarCargos();
    this.buscarPerfis();
  },
  methods: {
    voltar() {
      this.$router.push({ name: "usuarios" });
    },
    async buscarCargos() {
      try {
        this.loading = true;
        const response = await axios.get(`${api}/cargos`);
        this.cargoOpcoes = response.data;
      } catch (e) {
        this.$toasted.global.defaultError(e.response.data);
      } finally {
        this.loading = false;
      }
    },
    async buscarPerfis() {
      try {
        this.loading = true;
        const response = await axios.get(`${api}/perfis`);
        this.perfisOpcoes = response.data;
      } catch (e) {
        this.$toasted.global.defaultError(e.response.data);
      } finally {
        this.loading = false;
      }
    },
    async getUsuario() {
      this.loading = true;
      try {
        const response = await axios.get(
          `${api}/usuarios/${this.$route.params.id}`
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
          `${api}/usuarios/${this.$route.params.id}`,
          this.form
        );
        if (response.status == 204) {
          this.$toasted.global.defaultSuccess({
            message: "Usuário atualizado com sucesso!",
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
