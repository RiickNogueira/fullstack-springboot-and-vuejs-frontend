<template>
  <div class="NotFound">
    <v-container>
      <v-layout column wrap align-center>
        <v-flex xs12>
          <v-card height="400" color="transparent" flat>
            <div class="display-3 mt-5">Aplicação reiniciando...</div>
            <div class="grey--text lighten-5">
              Nossa API está hospedada de forma gratuita no
              <b>Heroku</b> e por isso cai com 30 minutos de inatividade.
            </div>
            <div class="paragraph-text mt-2">
              <br />
              <br />
              <v-layout column wrap align-center>
                <v-row align="center"
                  ><v-progress-circular
                    :size="50"
                    color="primary"
                    indeterminate
                  ></v-progress-circular></v-row
              ></v-layout>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import { api } from "@/global";

export default {
  name: "Home",
  mounted() {
    this.checkApi();
  },
  methods: {
    async checkApi() {
      try {
        const response = await axios.get(`${api}/app`);
        if (response.status == 200) {
          this.$router.push({ name: "home" });
        } else {
          this.reload();
        }
      } catch (e) {
        this.reload();
      }
    },
    reload() {
      setTimeout(() => {
        this.$router.go(this.$router.currentRoute);
      }, 5000);
    },
  },
};
</script>
