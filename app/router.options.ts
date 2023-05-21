import type { RouterConfig } from '@nuxt/schema';

// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterConfig>{
    routes: (_routes) => [
        {
            path: '/blogs/:blogPath+',
            component: () => import('~/pages/blogs/[blogPath].vue')
        }
    ],
};
