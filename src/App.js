import React from 'react'
import {Component } from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Login from './pages/login/login'
import Admin from './pages/admin/admin'
import memoryUtils from './utils/memoryUtils.js'
import storageUtils from './utils/storageUtils.js'

class App extends Component{
    render(){
        const user=storageUtils.getUser()
        memoryUtils.user=user
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/' component={Admin}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default App