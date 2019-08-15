import React,{ Component,Fragment } from 'react'
import {Globalstyle} from "./style";
import {Globalstyle1} from "./statics/iconfont/iconfont";
import Header from './common/header/index'
import Login from './common/login/index'
import { Provider } from 'react-redux'
import { BrowserRouter,Route} from 'react-router-dom'
import store from './store'
import routers from './router/router.js'
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
            {
                routers.map((router,index)=>{
                    return(
                        <Route key={index} path={router.path} exact={router.exact} component={router.component} />
                    )
                })
            }
        </div>
        </BrowserRouter>
        </Provider>
        </Fragment>
        )
    }
}


export default App

