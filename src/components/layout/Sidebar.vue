<template>
  <v-navigation-drawer clipped app v-model="drawer" mobile-breakpoint="800">
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
</template>

<script>
export default {
  computed: {
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(value) {
        this.$store.commit("toggleMenu", value);
      },
    },
    roles() {
      return this.$store.state.user.roles;
    },
  },
  data: () => ({
    items: [
      { title: "Cargos", icon: "mdi-view-dashboard", router: "cargos" },
      { title: "Perfis", icon: "mdi-account-cog", router: "perfis" },
      { title: "Usuários", icon: "mdi-account-group", router: "usuarios" },
    ],
  }),
};
</script>
