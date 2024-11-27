import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/layout/index.vue';
import { routersStore } from '@/store/modules/common/router';
import { loginStore } from '@/store/modules/common/loginStore';
import { getNav } from '@/api/sys/menu';
import { generateRoutesFromData } from '@/utils/routes';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { hashToken } from '@/utils/token';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/error/404.vue'),
    hidden: true,
  },
  {
    path: '/user',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        name: 'personalCenter',
        path: 'personalCenter',
        component: () => import('@/views/sys/my/personalCenter/index.vue'),
        meta: {
          title: '个人中心',
          icon: 'ep-user',
        },
      },
    ],
  },
];

const asynRouters = [];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const whiteList = ['/login', '/auth-redirect', '/bind', '/register'];

NProgress.configure({ showSpinner: false });

const checkAndAddRoutes = async (to, next) => {
  try {
    const menuList = routersStore().menuList;
    if (menuList.length === 0) {
      const res = await getNav();
      if (res.data.length > 0) {
        const newRoutes = generateRoutesFromData(res.data);
        routersStore().setMenuList(newRoutes);
        addRoutesToRouter(newRoutes);
        next({ ...to, replace: true });
      } else {
        next();
      }
      loginStore().getUserInfo();
    } else {
      next();
    }
  } catch (error) {
    next('/login');
  }
};

router.beforeEach(async (to, from, next) => {
  NProgress.start();

  const hasToken = hashToken();
  const isLoginPage = to.path === '/login';
  const isInWhiteList = whiteList.includes(to.path);

  if (hasToken) {
    if (isLoginPage) {
      next();
    } else {
      await checkAndAddRoutes(to, next);
    }
  } else {
    if (isInWhiteList) {
      next();
    } else {
      next('/login');
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

const addRoutesToRouter = (routes) => {
  routes.forEach((route) => {
    if (!router.hasRoute(route.name)) {
      router.addRoute(route);
    }
  });
};

export default router;
