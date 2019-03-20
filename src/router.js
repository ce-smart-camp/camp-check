import VueRouter from "vue-router";

import HelloWorld from "./components/HelloWorld.vue";
import Applicant from "./components/Applicant.vue";
import ApplicantDetail from "./components/ApplicantDetail.vue";

const router = new VueRouter({
  mode: "history",
  base: __dirname,
  routes: [
    { path: "/", component: HelloWorld },
    { path: "/applicant", name: "Applicant", component: Applicant },
    {
      path: "/applicant/:id",
      name: "ApplicantDetail",
      component: ApplicantDetail
    }
  ]
});

export default router;
