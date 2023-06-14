import Layout from '@/layout/index.vue';
import { vi } from 'element-plus/es/locale';
const modules = import.meta.glob('@/views/**/*.vue');
export function generateRoutesFromData(routers: any) {
  const routes = [];
  routers.forEach((routeData: any) => {
    const route = {
      path: routeData.path,
      name: routeData.name,
      meta: {
        title: routeData.title,
        icon: routeData.icon,
      },
      component: routeData.component === 'Layout' ? Layout : loadView(routeData.component),
      // component: () => import(`@/${routeData.component}.vue`),
      // 其他路由配置项
    };

    // 如果路由有子路由，则递归生成子路由
    if (routeData.children && routeData.children.length > 0) {
      route.children = generateRoutesFromData(routeData.children);
    }

    routes.push(route);
  });

  return routes;
}

//这里的路径需要根据你的项目路径来修改

export const loadView = (view: any) => {
  return modules[`/src/views${view}.vue`];
};

export function convertRouter(routers: any) {
  return routers.map((route: any) => {
    console.log('route', route.component);
    // if (route.component) {
    //   const component = route.component.match(/^@\S+|^Layout$/);

    //   console.log('as', component[0]);
    //   if (component)
    //     component[0] === 'Layout'
    //       ? (route.component = () => Layout)
    //       : (route.component = () => import(`${component[0]}`));
    //   else throw `后端路由加载失败，请输入'Layout'或以'@/'开头的本地组件地址: ${route.component}`;
    // }

    // if (route.children)
    //   route.children.length ? (route.children = convertRouter(route.children)) : delete route.children;

    // return route;

    if (route.component) {
      // Layout ParentView 组件特殊处理
      if (route.component === 'Layout') {
        route.component = Layout;
      } else {
        route.component = () => import(`@/${route.component}.vue`); //import(`${route.component}.vue`);
      }
    }

    if (route.children)
      route.children.length ? (route.children = convertRouter(route.children)) : delete route.children;

    return route;
  });
}
// export const loadView = (view: string) => {
//   console.log('view', view);
//   const path = view + '.vue';
//   // 使用 import 实现生产环境的路由懒加载
//   return () => import(`${view}.vue`);
// };
