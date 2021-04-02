<template>
  <div>
    <v-data-table :headers="headers" :items="itens" :loading="loading">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Perfis</v-toolbar-title>
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
          <v-icon small @click.prevent="confirmarExclusao(item)">
            mdi-delete
          </v-icon>
        </td>
      </template>
    </v-data-table>
    <ModalConfirmacao
      header="Confirmação de Exclusão"
      :message="
        this.itemSelecionado
          ? `Tem certeza que deseja remover o perfil ${this.itemSelecionado.nome.toUpperCase()} (${
              this.itemSelecionado.id
            }) do banco de dados?`
          : ``
      "
      :visible="modalConfirmacao"
      :onCancel="cancelarExclusao"
      :onConfirm="excluir"
    />
  </div>
</template>

<script>
import axios from "axios";
import ModalConfirmacao from "@/components/ModalConfirmacao";
import { api } from "@/global";

export default {
  name: "Perfis",
  components: {
    ModalConfirmacao,
  },
  data: () => {
    return {
      loading: false,
      itens: [],
      headers: [
        { text: "Id", align: "left", value: "id" },
        { text: "Nome", align: "left", value: "nome" },
        { text: "Ações", align: "right", value: "acoes", sortable: false },
      ],
      modalConfirmacao: false,
      itemSelecionado: null,
    };
  },
  created() {
    this.buscarItens();
  },
  methods: {
    async buscarItens() {
      try {
        this.loading = true;
        const response = await axios.get(`${api}/perfis`);
        this.itens = response.data;
      } catch (e) {
        this.$toasted.global.defaultError(e.response.data);
      } finally {
        this.loading = false;
      }
    },
    novo() {
      this.$router.push({ name: "perfil-criar" });
    },
    editar(item) {
      this.$router.push({ name: "perfil-editar", params: { id: item.id } });
    },
    confirmarExclusao(item) {
      this.itemSelecionado = item;
      this.modalConfirmacao = true;
    },
    cancelarExclusao() {
      this.itemSelecionado = null;
      this.modalConfirmacao = false;
    },
    async excluir() {
      try {
        this.loading = true;
        const response = await axios.delete(
          `${api}/perfis/${this.itemSelecionado.id}`
        );
        if (response.status == 204) {
          this.$toasted.global.defaultSuccess({
            message: "Perfil excluído com sucesso!",
          });
          this.buscarItens();
        }
      } catch (e) {
        this.$toasted.global.defaultError(e.response.data);
      } finally {
        this.cancelarExclusao();
        this.loading = false;
      }
    },
  },
};
</script>
