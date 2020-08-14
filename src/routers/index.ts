import AppFrame from 'components/pageFrame'
import Home from 'views/home'
import Add from 'views/add'
import Index from 'views/index'

const routes: any[] = [
  {
    path: '/',
    component: AppFrame,
    routes: [
      {
        path: '/index',
        name: '入口',
        component: Index,
        show: true,
      },
      {
        path: '/home',
        name: '首页',
        component: Home,
        show: true,
      },
      {
        path: '/add',
        name: '新增',
        component: Add,
        show: true,
      },
    ]
  }
]

export default routes;