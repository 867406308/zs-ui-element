import { hashToken } from '@/utils/token';
import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/layout/index.vue';
import { routersStore } from '@/store/modules/router';
import { useUserStore } from '@/store/modules/sys/user';
import { getNav } from '@/api/sys/menu';
import { convertRouter, generateRoutesFromData } from '@/utils/routes';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 初始化时的最小百分比
});
const routers = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    // name: 'NotFound',
    component: () => import('@/views/error/404.vue'),
    hidden: true,
  },
  {
    path: '/nav',
    name: 'nav',
    component: () => import('@/views/nav/index.vue'),
  },
];

const asynRouters = [
  {
    path: '/',
    name: '',
    component: Layout,
    meta: {
      title: '首页',
      icon: 'document',
    },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/index/index.vue'),
        meta: {
          title: '首页',
          icon: 'document',
        },
      },
    ],
  },
  {
    path: '/sys',
    name: 'sys',
    component: Layout,
    meta: {
      title: '系统',
      icon: 'setting',
    },
    children: [
      {
        path: 'dept',
        name: 'dept',
        component: () => import('@/views/sys/dept/index.vue'),
        meta: {
          title: '部门管理',
          icon: 'menu',
        },
      },
      {
        path: 'menu',
        name: 'menu',
        component: () => import('@/views/sys/menu/index.vue'),
        meta: {
          title: '菜单管理',
          icon: 'menu',
        },
      },
      {
        path: '/role',
        name: 'role',
        component: () => import('@/views/sys/role/index.vue'),
        meta: {
          title: '角色管理',
          icon: 'user-filled',
        },
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('@/views/sys/user/index.vue'),
        meta: {
          title: '用户管理',
          icon: 'user',
        },
      },
    ],
  },
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
  NProgress.start();
  console.log('from', from);
  console.log('to', to);
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
              next({ ...to, replace: true }); // hack方法 确保addRoutes已完成
              //token存在，不是login页面
            } else {
              next();
            }
          })
          .catch((error: any) => {
            next('/login');
          });
        useUserStore().getUserInfo();
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
