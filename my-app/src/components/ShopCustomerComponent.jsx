import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import ShopCustomerService from '../service/ShopCustomerService';

const SHOPID = 1

class ShopCustomerComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            customerId: -1,
            customerName: '',
            customerEmail: '',
            balance: 0
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)

    }

    componentDidMount() {

        console.log(this.state.id)

        // eslint-disable-next-line
        if (this.state.id == -1) {
            return
        }

        ShopCustomerService.retrieveCustomer(SHOPID, this.state.id)
            .then(response => this.setState({
                customerId: response.data.customer.id,
                customerName: response.data.customer.name,
                customerEmail: response.data.customer.email,
                balance: response.data.balance
            }))
    }

    validate(values) {
        let errors = {}
        if (!values.customerId) {
            errors.description = 'Enter a valid customer id'
        }
        else if (!values.balance) {
            errors.description = 'Enter a balance amount'
        } 

        return errors

    }

    onSubmit(values) {
        let shopId = SHOPID

        let customerId = values.customerId

        let shopCustomer = {
            balance: values.balance,
        }

        if (this.state.id === -1) {
            ShopCustomerService.addCustomer(shopId, customerId, shopCustomer)
                .then(() => this.props.history.push('/shopCustomers'))
        } else {
            ShopCustomerService.updateCustomer(shopId, customerId, shopCustomer)
                .then(() => this.props.history.push('/shopCustomers'))
        }

        console.log(values);
    }

    render() {

        let { id, customerId, customerName, customerEmail, balance} = this.state
        let isCreating = (id == -1)
        return (
            <div>
                <h3>Shop Customer</h3>
                <div className="container">
                    <Formik
                        initialValues={{ id, customerId, customerName, customerEmail, balance }}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div"
                                        className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label>Customer ID</label>
                                        <Field className="form-control" type="int" name="customerId" disabled = {!isCreating} />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label hidden={isCreating}>Customer name</label>
                                        <Field className="form-control" type="text" hidden={isCreating} name="customerName"  disabled />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label hidden={isCreating}>Customer email</label>
                                        <Field className="form-control" type="text" hidden={isCreating} name="customerEmail"  disabled />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Balance</label>
                                        <Field className="form-control" type="int" name="balance" />
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>

                </div>
            </div>
        )
    }
}

export default ShopCustomerComponent