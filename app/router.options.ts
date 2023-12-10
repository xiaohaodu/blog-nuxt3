import type { RouterConfig } from '@nuxt/schema';

// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterConfig>{
  routes: (_routes) => [
    ..._routes,
    {
      path: '/blogs/:blogPath+',
      component: () => import('~/pages/blogs/[blogPath].vue'),
    },
    {
      path: '/blogs/edit/:blogPath+',
      component: () => import('~/pages/blogs/edit/[blogPath].vue'),
    },
    {
      path: '/blogs/add/:blogPath*',
      component: () => import('~/pages/blogs/add/[blogPath].vue'),
    },
  ],
};
