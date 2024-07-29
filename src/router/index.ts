import { hashToken } from '@/utils/token';
import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/layout/index.vue';
import { routersStore } from '@/store/modules/common/router';
import { loginStore } from '@/store/modules/common/loginStore';
import { getNav } from '@/api/sys/menu';
import { convertRouter, generateRoutesFromData } from '@/utils/routes';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const routers = [
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
    // hidden: true,
    redirect: 'noredirect',
    children: [
      {
        name: 'personalCenter',
        path: 'personalCenter',
        component: () => import('@/views/sys/my/personalCenter/index.vue'),
        meta: {
          title: '个人中心',
          icon: 'user-filled',
        },
      },
    ],
  },
];

const asynRouters = [
  // {
  //   path: '/',
  //   name: '',
  //   component: Layout,
  //   meta: {
  //     title: '首页',
  //     icon: 'document',
  //   },
  //   children: [
  //     {
  //       path: 'home',
  //       name: 'home',
  //       component: () => import('@/views/index/home.vue'),
  //       meta: {
  //         title: '首页',
  //         icon: 'document',
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: '/sys',
  //   name: 'sys',
  //   component: Layout,
  //   meta: {
  //     title: '系统',
  //     icon: 'setting',
  //   },
  //   children: [
  //     {
  //       path: 'dept',
  //       name: 'dept',
  //       component: () => import('@/views/sys/dept/index.vue'),
  //       meta: {
  //         title: '部门管理',
  //         icon: 'menu',
  //       },
  //     },
  //     {
  //       path: 'menu',
  //       name: 'menu',
  //       component: () => import('@/views/sys/menu/index.vue'),
  //       meta: {
  //         title: '菜单管理',
  //         icon: 'menu',
  //       },
  //     },
  //     {
  //       path: '/role',
  //       name: 'role',
  //       component: () => import('@/views/sys/role/index.vue'),
  //       meta: {
  //         title: '角色管理',
  //         icon: 'user-filled',
  //       },
  //     },
  //     {
  //       path: '/user',
  //       name: 'user',
  //       component: () => import('@/views/sys/user/index.vue'),
  //       meta: {
  //         title: '用户管理',
  //         icon: 'user',
  //       },
  //     },
  //   ],
  // },
];

const router = createRouter({
  // hash模式：createWebHashHistory，
  // history模式：createWebHistory
  history: createWebHistory(),
  routes: routers,
});
const whiteList = ['/login', '/auth-redirect', '/bind', '/register'];

router.beforeEach((to, from, next) => {
  // 每次切换页面时，调用进度条
  NProgress.configure({ showSpinner: false });
  NProgress.start();

  if (hashToken()) {
    //toekn存在
    if (to.path == '/login') {
      //token存在，并且是login页面
      next();
    } else {
      if (routersStore().menuList.length == 0) {
        getNav()
          .then((res: any) => {
            if (res.data.length > 0) {
              const routers = generateRoutesFromData(res.data);
              routersStore().setMenuList(routers);
              addRouter(routers);
              next({ ...to, replace: true });
            } else {
              next();
            }
          })
          .catch((error: any) => {
            next('/login');
          });
        loginStore().getUserInfo();
      } else {
        next();
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next();
    } else {
      //token不存在，不是login页面
      next('/login');
    }
  }
});
// 当路由进入后：关闭进度条
router.afterEach(() => {
  // 在即将进入新的页面组件前，关闭掉进度条
  NProgress.done();
});
export function addRouter(routers: any) {
  routers.map((e: any) => {
    router.addRoute(e);
  });
}

export default router;
