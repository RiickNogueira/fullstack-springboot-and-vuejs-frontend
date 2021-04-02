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
