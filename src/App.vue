<template>
  <v-app>
    <Sidebar />
    <Header />
    <Content />
    <Footer />
  </v-app>
</template>

<script>
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import Content from "./components/layout/Content";
import Footer from "./components/layout/Footer";
export default {
  name: "App",
  components: { Sidebar, Header, Content, Footer },
};
</script>

<style>
.theme--light.v-data-table tbody tr:nth-of-type(even) {
  background-color: rgba(0, 0, 0, 0.03);
}
.theme--dark.v-data-table tbody tr:nth-of-type(even) {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
