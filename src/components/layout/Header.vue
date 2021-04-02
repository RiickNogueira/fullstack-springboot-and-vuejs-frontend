<template>
  <v-app-bar
    color="primary"
    dark
    app
    :clipped-left="$vuetify.breakpoint.mdAndUp"
    fixed
  >
    <v-app-bar-nav-icon @click.stop="toggleMenu"></v-app-bar-nav-icon>
  </v-app-bar>
</template>

<script>
export default {
  name: "Header",
  methods: {
    toggleMenu() {
      this.$store.commit("toggleMenu");
    },
  },
};
</script>
