import VueRouter from "vue-router";
import goTo from "vuetify/lib/components/Vuetify/goTo";

import HelloWorld from "./components/HelloWorld.vue";

import Applicant from "./components/Applicant.vue";
import ApplicantDetail from "./components/ApplicantDetail.vue";

import Question from "./components/Question.vue";
import QuestionDetail1 from "./components/QuestionDetail1";
import QuestionDetail2 from "./components/QuestionDetail2";

import Sum from "./components/Sum";

import Store from "./store";

const router = new VueRouter({
  mode: "history",
  base: __dirname,
  scrollBehavior: (to, from, savedPosition) => {
    let scrollTo = 0;

    if (to.hash) {
      scrollTo = to.hash;
    } else if (savedPosition) {
      scrollTo = savedPosition.y;
    }

    return goTo(scrollTo);
  },
  routes: [
    { path: "/", component: HelloWorld },
    {
      path: "/a",
      component: Applicant,
      beforeEnter: (to, from, next) => {
        if (to.path === "/a" && from.path === "/")
          Store.commit("setPagination", { sortBy: "created_at" });
        next();
      }
    },
    {
      path: "/a/:id",
      name: "aid",
      component: ApplicantDetail
    },
    {
      path: "/q",
      component: Question,
      beforeEnter: (to, from, next) => {
        if (to.path === "/q" && from.path === "/")
          Store.commit("setPagination", { sortBy: "completed_at" });
        next();
      }
    },
    {
      path: "/q1/:idNum",
      name: "qid1",
      component: QuestionDetail1
    },
    {
      path: "/q2/:idNum",
      name: "qid2",
      component: QuestionDetail2
    },
    {
      path: "/s",
      component: Sum,
      beforeEnter: (to, from, next) => {
        if (to.path === "/s" && from.path === "/")
          Store.commit("setPagination", {
            sortBy: "score.sum",
            descending: true
          });
        next();
      }
    }
  ]
});

export default router;
