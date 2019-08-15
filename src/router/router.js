import Loadable from 'react-loadable'
//标记： 在定义我们的路由对象，使用react-loadable 对路由组件进行懒加载，这是经常需要做的行为。
// 详情请参考这一篇文章：https://blog.csdn.net/China_Guanq/article/details/82194928#loadable
const loadable = (filename) => Loadable({
    loader:() => import(`../pages/${filename}`),
    loading:() => ('')
});
const routers = [
    {
        path:'/',
        exact:true,
        component:loadable('home')
    },
    {
        exact:true,
        path:'/detail/:id',
        component:loadable('detail')
    },
    {
        exact:true,
        path:'/userInfo',
        component:loadable('usersetting/User')
    },
    {
        exact:true,
        path:'/article',
        component:loadable('article')
    },
];

export default routers;