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
      component: () =>
        import(/* webpackChunkName: "main" */ "./components/HelloWorld.vue")
    },
    {
      path: "/a",
      name: "a",
      component: () =>
        import(/* webpackChunkName: "a" */ "./components/Applicant.vue")
    },
    {
      path: "/a/:id",
      name: "aid",
      component: () =>
        import(/* webpackChunkName: "aid" */ "./components/ApplicantDetail.vue")
    },
    {
      path: "/q",
      name: "q",
      component: () =>
        import(/* webpackChunkName: "q" */ "./components/Question.vue")
    },
    {
      path: "/q/:idNum/q1",
      name: "qid1",
      component: () =>
        import(/* webpackChunkName: "qid1" */ "./components/QuestionDetail1")
    },
    {
      path: "/q/:idNum/q2",
      name: "qid2",
      component: () =>
        import(/* webpackChunkName: "qid2" */ "./components/QuestionDetail2")
    },
    {
      path: "/s",
      name: "s",
      component: () => import(/* webpackChunkName: "s" */ "./components/Sum")
    }
  ]
});

export default router;
