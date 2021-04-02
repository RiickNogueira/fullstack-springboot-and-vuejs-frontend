import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Cargos from "../views/cargos/Cargos.vue";
import Perfis from "../views/perfis/Perfis.vue";
import Usuarios from "../views/usuarios/Usuarios.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/timeout",
    name: "timeout",
    component: () => import("../views/Timeout"),
  },
  { path: "*", redirect: { name: "home" } },
  {
    path: "/cargos",
    name: "cargos",
    component: Cargos,
  },
  {
    path: "/cargo/novo",
    name: "cargo-criar",
    component: () => import("../views/cargos/CargoCriar"),
  },
  {
    path: "/cargo/:id",
    name: "cargo-editar",
    component: () => import("../views/cargos/CargoEditar"),
  },
  {
    path: "/perfis",
    name: "perfis",
    component: Perfis,
  },
  {
    path: "/perfil/novo",
    name: "perfil-criar",
    component: () => import("../views/perfis/PerfilCriar"),
  },
  {
    path: "/perfil/:id",
    name: "perfil-editar",
    component: () => import("../views/perfis/PerfilEditar"),
  },
  {
    path: "/usuarios",
    name: "usuarios",
    component: Usuarios,
  },
  {
    path: "/usuario/novo",
    name: "usuario-criar",
    component: () => import("../views/usuarios/UsuarioCriar"),
  },
  {
    path: "/usuario/:id",
    name: "usuario-editar",
    component: () => import("../views/usuarios/UsuarioEditar"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
