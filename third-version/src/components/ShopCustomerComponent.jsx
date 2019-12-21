import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import ShopCustomerService from '../service/ShopCustomerService';
import CustomerService from '../service/CustomerService';

const SHOPID = 1

function doesEmailExist(email) {
    let result = false
    CustomerService.retrieveCustomerByEmail(email).then(
        ()=>result=true
    )
    return result
}

class ShopCustomerComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            customerId: -1,
            customerName: '',
            customerEmail: '',
            balance: 0,
            isPromiseResolved:true
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

        ShopCustomerService.retrieveShopCustomer(SHOPID, this.state.id)
            .then(response => this.setState({
                customerId: response.data.customer.id,
                customerName: response.data.customer.name,
                customerEmail: response.data.customer.email,
                balance: response.data.balance
            }))
    }

    validate(values) {
        let errors = {}
        //let isExist = false
        //let currentComponent = this
        if (!values.customerEmail) {
            errors.customerEmail = <div>  <strong>ERROR!</strong>  Customer Email field should not be empty.</div>
            return errors
        }
        else {
            CustomerService.retrieveCustomerByEmail(values.customerEmail)           
            .catch(function (error) {
                if (error.response) {
                  // The request was made and the server responded with a status code
                  // that falls out of the range of 2xx
                  console.log(error.response.data);
                  console.log(error.response.status);
                  console.log(error.response.headers);
                } else if (error.request) {
                  // The request was made but no response was received
                  // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                  // http.ClientRequest in node.js
                  console.log(error.request);
                } else {
                  // Something happened in setting up the request that triggered an Error
                  console.log('Error', error.message);
                }
                console.log(error.toJSON());
                errors.customerEmail = <div>  <strong>ERROR!</strong>  Customer Email does not exist.</div>
                // currentComponent.setState({isPromiseResolved:true})
                return errors
              })
              
        }


    }

    onSubmit(values) {
        //console.log(values);
        let shopId = SHOPID

        let customerId = values.customerId
        let customerEmail = values.customerEmail

        let shopCustomer = {
            balance: values.balance,
        }
        

        if (this.state.id == -1) {
            CustomerService.retrieveCustomerByEmail(customerEmail).then(
                (response => 
                    ShopCustomerService.addShopCustomer(shopId, response.data.id, shopCustomer)
                        .then(() => this.props.history.push('/shopCustomers'))
                )
            )
        } else {
            ShopCustomerService.updateShopCustomer(shopId, customerId, shopCustomer)
                .then(() => this.props.history.push('/shopCustomers'))
        }

        //console.log(values);
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
                        validateOnChange={true}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <fieldset className="form-group">
                                        <label hidden = {isCreating}>Customer ID</label>
                                        <Field className="form-control" type="int" name="customerId" hidden = {isCreating} disabled = {!isCreating} />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label hidden={isCreating}>Customer name</label>
                                        <Field className="form-control" type="text" hidden={isCreating} name="customerName"  disabled />
                                    </fieldset>
                                    
                                    <ErrorMessage name="customerEmail" component="div"
                                        className="alert alert-danger"/>
                                    
                                    <fieldset className="form-group">
                                        <label>Customer Email</label>
                                        <Field className="form-control" type="text" name="customerEmail"  disabled = {!isCreating} />
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