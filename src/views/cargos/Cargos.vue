<template>
  <div>
    <v-data-table :headers="headers" :items="itens" :loading="loading">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Cargos</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="primary" dark class="mb-2" @click.prevent="novo">
            <v-icon left>mdi-plus</v-icon>Novo
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:[`item.acoes`]="{ item }">
        <td class="justify-end layout px-0">
          <v-icon small class="mr-2" @click.prevent="editar(item)">
            mdi-pencil
          </v-icon>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from "axios";
import { api } from "@/global";

export default {
  name: "Cargos",
  data: () => {
    return {
      loading: false,
      itens: [],
      headers: [
        { text: "Id", align: "left", value: "id" },
        { text: "Nome", align: "left", value: "nome" },
        { text: "Ações", align: "right", value: "acoes", sortable: false },
      ],
    };
  },
  created() {
    this.buscarItens();
  },
  methods: {
    async buscarItens() {
      try {
        this.loading = true;
        const response = await axios.get(`${api}/cargos`);
        this.itens = response.data;
      } catch (e) {
        this.$toasted.global.defaultError(e.response.data);
      } finally {
        this.loading = false;
      }
    },
    novo() {
      this.$router.push({ name: "cargo-criar" });
    },
    editar(item) {
      this.$router.push({ name: "cargo-editar", params: { id: item.id } });
    },
  },
};
</script>
