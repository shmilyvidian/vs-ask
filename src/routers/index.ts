import AppFrame from 'components/pageFrame'
import Home from 'views/home'
import Add from 'views/add'

const routes:any[] = [
    {
        path:'/',
        component : AppFrame,
        routes: [
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