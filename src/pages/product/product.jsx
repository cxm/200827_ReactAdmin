import React, { Component } from 'react'
import {Redirect,Switch,Route} from 'react-router-dom'
import ProductHome from './home.jsx'
import ProductAddUpdate from './add-update.jsx'
import ProductDetail from './detail.jsx'
export class Product extends Component {
    render() {
        return (
            <Switch>
                <Route path="/product" component={ProductHome} exact></Route>
                <Route path="/product/addupdate" component={ProductAddUpdate} exact></Route>
                <Route path="/product/detail" component={ProductDetail} exact></Route>
                <Redirect to="/product"></Redirect>
            </Switch>
        )
    }
}

export default Product
