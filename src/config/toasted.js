import Vue from "vue";
import Toasted from "vue-toasted";

Vue.use(Toasted, {
  iconPack: "fontawesome",
  position: "bottom-right",
  duration: 5000,
});

Vue.toasted.register(
  "defaultSuccess",
  (payload) =>
    !payload.message && !payload.message != ""
      ? "Operação realizada com sucesso!"
      : payload.message,
  { type: "success", icon: "check" }
);

Vue.toasted.register(
  "defaultError",
  (payload) =>
    !payload.message
      ? "Ocorreu um erro inesperado. Contate o suporte."
      : payload.message + ": " + payload.cause,
  { type: "error", icon: "times" }
);
