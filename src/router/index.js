import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import LoginG from "@/components/LoginG";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "HelloWorld",
      component: {
        default: HelloWorld,
        LoginG: LoginG
      }
    },
    {
      path: "/login/google",
      name: "LoginG",
      component: LoginG
    }
  ]
});
