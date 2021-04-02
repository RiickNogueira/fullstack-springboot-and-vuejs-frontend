<template>
  <div v-if="loading">
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
  <v-container v-else fill-height text-xs-center>
    <v-layout column wrap align-center>
      <v-row align="center">
        <blockquote>
          Desenvolvido por <b>Richardson Nogueira</b>
          <footer>
            <small>
              <em>Aplicação funcionando...</em>
            </small>
          </footer>
        </blockquote>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import { api } from "@/global";

export default {
  name: "Home",
  data() {
    return {
      loading: true,
    };
  },
  created() {
    this.checkApi();
  },
  methods: {
    async checkApi() {
      try {
        const response = await axios.get(`${api}/app`);
        if (response.status != 200) {
          this.$router.push({ name: "timeout" });
        }
      } catch (e) {
        this.$router.push({ name: "timeout" });
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
