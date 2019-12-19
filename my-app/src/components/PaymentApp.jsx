import React, { Component } from 'react';
import ListShopCustomersComponent from './ListShopCustomersComponent';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ShopCustomerComponent from './ShopCustomerComponent';

class PaymentApp extends Component {
    render() {
        return (
            <Router>
                <>
                    <h1>Payment Application</h1>
                    <Switch>
                        <Route path="/" exact component={ListShopCustomersComponent} />
                        <Route path="/shopCustomers" exact component={ListShopCustomersComponent} />
                        <Route path="/shopCustomers/:id" component={ShopCustomerComponent} />
                    </Switch>
                </>
            </Router>
        )
    }
}

export default PaymentApp