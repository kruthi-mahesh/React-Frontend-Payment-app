import React, { Component } from 'react'
import ShopCustomerService from '../service/ShopCustomerService';

const SHOPID = 1

class ListShopCustomersComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shopCustomers: [],
            message: null
        }
        this.deleteCustomerClicked = this.deleteCustomerClicked.bind(this)
        this.updateCustomerClicked = this.updateCustomerClicked.bind(this)
        this.addCustomerClicked = this.addCustomerClicked.bind(this)
        this.refreshCustomers = this.refreshCustomers.bind(this)
    }

    componentDidMount() {
        this.refreshCustomers();
    }

    refreshCustomers() {
        ShopCustomerService.retrieveAllShopCustomers(SHOPID)//HARDCODED
            .then(
                response => {
                    console.log(response);
                    this.setState({ shopCustomers: response.data })
                }
            )
    }

    deleteCustomerClicked(customerId) {
        ShopCustomerService.deleteShopCustomer(SHOPID, customerId)
            .then(
                response => {
                    this.setState({ message: `Delete of customer id ${customerId} Successful` })
                    this.refreshCustomers()
                }
            )

    }

    addCustomerClicked() {
        this.props.history.push(`/shopCustomers/-1`)
    }

    updateCustomerClicked(id) {
        console.log('update ' + id)
        this.props.history.push(`/shopCustomers/${id}`)
    }

    render() {
        console.log('render')
        return (
            <div className="container">
                <h3>All Shop Customers</h3>
                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Customer Id</th>
                                <th>Customer Name</th>
                                <th>Customer Email</th>
                                <th>Balance</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.shopCustomers.map(
                                    shopCustomer =>
                                        <tr key={shopCustomer.id}>
                                            <td>{shopCustomer.customer.id}</td>
                                            <td>{shopCustomer.customer.name}</td>
                                            <td>{shopCustomer.customer.email}</td>
                                            <td>{shopCustomer.balance}</td>
                                            <td><button className="btn btn-success" onClick={() => this.updateCustomerClicked(shopCustomer.id)}>Update Customer</button></td>
                                            <td><button className="btn btn-warning" onClick={() => this.deleteCustomerClicked(shopCustomer.customer.id)}>Delete Customer</button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addCustomerClicked}>Add new customer</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListShopCustomersComponent