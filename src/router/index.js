import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '控制面板', icon: 'dashboard' }
    }]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system',
    name: 'System',
    meta: { title: '系统信息管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/system/user/index'),
        meta: { title: '用户信息管理', icon: 'tree' }
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/system/role/index'),
        meta: { title: '角色信息管理', icon: 'table' }
      },
      {
        path: 'authority',
        name: 'Authority',
        component: () => import('@/views/system/authority/index'),
        meta: { title: '权限信息管理', icon: 'table' }
      }
    ]
  },
  {
    path: '/base',
    component: Layout,
    redirect: '/base',
    name: 'Base',
    meta: { title: '基础信息管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'hospital',
        name: 'Hospital',
        component: () => import('@/views/base/hospital/index'),
        meta: { title: '医院信息管理', icon: 'table' }
      }
    ]
  },
  {
    path: '/project',
    component: Layout,
    redirect: '/project',
    name: 'Project',
    meta: { title: '现场项目维护', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'version',
        name: 'Version',
        component: () => import('@/views/project/version/index'),
        meta: { title: '版本检索', icon: 'table' }
      },
      {
        path: 'issue',
        name: 'Issue',
        component: () => import('@/views/project/issue/index'),
        meta: { title: '问题反馈', icon: 'tree' }
      },
      {
        path: 'assignment',
        name: 'Assignment',
        component: () => import('@/views/project/assignment/index'),
        meta: { title: '责任分配', icon: 'tree' }
      }
    ]
  },
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
