import VueRouter from "vue-router";
import goTo from "vuetify/lib/components/Vuetify/goTo";

import HelloWorld from "./components/HelloWorld.vue";

import Applicant from "./components/Applicant.vue";
import ApplicantDetail from "./components/ApplicantDetail.vue";

import Question from "./components/Question.vue";
import QuestionDetail1 from "./components/QuestionDetail1";
import QuestionDetail2 from "./components/QuestionDetail2";

import Sum from "./components/Sum";

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
      name: "a",
      component: Applicant
    },
    {
      path: "/a/:id",
      name: "aid",
      component: ApplicantDetail
    },
    {
      path: "/q",
      name: "q",
      component: Question
    },
    {
      path: "/q/:idNum/q1",
      name: "qid1",
      component: QuestionDetail1
    },
    {
      path: "/q/:idNum/q2",
      name: "qid2",
      component: QuestionDetail2
    },
    {
      path: "/s",
      name: "s",
      component: Sum
    }
  ]
});

export default router;
