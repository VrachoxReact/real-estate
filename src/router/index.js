import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("../pages/Home.vue"),
    },
    {
      path: "/properties",
      name: "Properties",
      component: () => import("../pages/Properties.vue"),
    },
    {
      path: "/property/:id",
      name: "PropertyDetail",
      component: () => import("../pages/PropertyDetail.vue"),
      props: true,
    },
    {
      path: "/about",
      name: "About",
      component: () => import("../pages/About.vue"),
    },
    {
      path: "/contact",
      name: "Contact",
      component: () => import("../pages/Contact.vue"),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0, behavior: "smooth" };
  },
});

// Implement navigation guards for analytics and loading states
router.beforeEach((to, from, next) => {
  // Show loading indicator
  // ... loading logic
  next();
});

export default router;
