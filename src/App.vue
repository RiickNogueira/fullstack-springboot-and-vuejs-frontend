<template>
  <v-app>
    <v-navigation-drawer fixed app mobile-break-point="800">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title"> FullStack App </v-list-item-title>
          <v-list-item-subtitle> Spring Boot + Vue.JS </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="{ name: item.router }"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary"> </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app> </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    items: [
      { title: "Cargos", icon: "mdi-view-dashboard", router: "cargos" },
      { title: "Perfis", icon: "mdi-account-cog", router: "perfis" },
      { title: "Usuários", icon: "mdi-account-group", router: "usuarios" },
    ],
  }),
};
</script>
