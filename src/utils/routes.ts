import Layout from '@/layout/index.vue';
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
        route.component = () => import(`${route.component}.vue`);
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
