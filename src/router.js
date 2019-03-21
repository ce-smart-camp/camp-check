import VueRouter from "vue-router";

import HelloWorld from "./components/HelloWorld.vue";
import Applicant from "./components/Applicant.vue";
import ApplicantDetail from "./components/ApplicantDetail.vue";

import Question1 from "./components/Question1.vue";
import Question2 from "./components/Question2.vue";

const router = new VueRouter({
  mode: "history",
  base: __dirname,
  routes: [
    { path: "/", component: HelloWorld },
    { path: "/a", component: Applicant },
    {
      path: "/a/:id",
      name: "ApplicantDetail",
      component: ApplicantDetail
    },
    { path: "/q1", component: Question1 },
    { path: "/q2", component: Question2 }
  ]
});

export default router;
