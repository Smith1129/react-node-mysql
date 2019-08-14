import React,{ Component,Fragment } from 'react'
import {Globalstyle} from "./style";
import {Globalstyle1} from "./statics/iconfont/iconfont";
import Header from './common/header/index'
import Login from './common/login/index'
import { Provider } from 'react-redux'
import { BrowserRouter,Route} from 'react-router-dom'
import store from './store'
import Home from './pages/home'
import Detail from './pages/detail'
import User from './pages/usersetting/User'
import Article from './pages/article/index'
import 'antd/dist/antd.css'
class App extends Component {
    render() {
        return (
        <Fragment>
        <Globalstyle/>
        <Globalstyle1/>
        <Provider store={store}>
        <BrowserRouter>
        <div>
            <Header/>
            <Login/>
            <Route path='/' exact component={Home}></Route>
            <Route path='/detail/:id' exact component={Detail}></Route>
            <Route path='/userInfo' exact component={User}></Route>
            <Route path='/article' exact component={Article}></Route>
        </div>
        </BrowserRouter>
        </Provider>
        </Fragment>
        )
    }
}


export default App

