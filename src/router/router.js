import { createRouter, createWebHistory } from "vue-router";
import FormComponent from "../components/Form.vue";
import GameComponent from "../components/Game.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "formComponent",
      component: FormComponent,
    },
    {
      path: "/game",
      name: "gameComponent",
      component: GameComponent,
    }
  ],
});

router.beforeEach((to, from, next) => {
  console.log({to, from});
  next();
});