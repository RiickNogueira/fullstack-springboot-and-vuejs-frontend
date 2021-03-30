import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Cargos from "../views/Cargos.vue";
import Perfis from "../views/Perfis.vue";
import Usuarios from "../views/Usuarios.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/cargos",
    name: "cargos",
    component: Cargos,
  },
  {
    path: "/perfis",
    name: "perfis",
    component: Perfis,
  },
  {
    path: "/usuarios",
    name: "usuarios",
    component: Usuarios,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
