import Home from "./view/HelloWorld.vue";
import VueRouter from "vue-router";
import goTo from "vuetify/lib/components/Vuetify/goTo";

const router = new VueRouter({
  mode: "history",
  base: __dirname,
  scrollBehavior(to, from, savedPosition) {
    let scrollTo = 0;

    if (to.hash) {
      scrollTo = to.hash;
    } else if (to.name === from.name) {
      scrollTo = 0;
    } else if (savedPosition) {
      scrollTo = savedPosition.y;
    }

    return new Promise(resolve => {
      goTo(scrollTo).then(() => {
        resolve({ x: 0, y: scrollTo });
      });
    });
  },
  routes: [
    {
      path: "/",
      name: "main",
      component: Home
    },
    {
      path: "/a",
      name: "a",
      component: () =>
        import(/* webpackChunkName: "a" */ "./view/Applicant.vue")
    },
    {
      path: "/a/:id",
      name: "aid",
      component: () =>
        import(/* webpackChunkName: "aid" */ "./view/ApplicantDetail.vue")
    },
    {
      path: "/q",
      name: "q",
      component: () => import(/* webpackChunkName: "q" */ "./view/Question.vue")
    },
    {
      path: "/q/:idNum/q1",
      name: "qid1",
      component: () =>
        import(/* webpackChunkName: "qid1" */ "./view/QuestionDetail1")
    },
    {
      path: "/q/:idNum/q2",
      name: "qid2",
      component: () =>
        import(/* webpackChunkName: "qid2" */ "./view/QuestionDetail2")
    },
    {
      path: "/s",
      name: "s",
      component: () => import(/* webpackChunkName: "s" */ "./view/Sum")
    }
  ]
});

export default router;
