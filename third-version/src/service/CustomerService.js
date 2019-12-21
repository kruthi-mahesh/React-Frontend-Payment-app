import axios from '../../node_modules/axios'

const PAYMENT_API_URL = 'http://localhost:8080/payment'
const CUSTOMER_API_URL = `${PAYMENT_API_URL}/customers`

class CustomerService {

    retrieveAllCustomers() {
        //console.log('executed service')
        return axios.get(`${CUSTOMER_API_URL}`);
    }

    retrieveCustomerById(id) {
        //console.log('executed service')
        return axios.get(`${CUSTOMER_API_URL}/${id}`);
    }

    retrieveCustomerByEmail(email) {
        //console.log('executed service')
        return axios.get(`${CUSTOMER_API_URL}/by_email/${email}`);
    }

    deleteCustomer(id) {
        //console.log('executed service')
        return axios.delete(`${CUSTOMER_API_URL}/${id}`);
    }

    updateCustomer(id, customer) {
        //console.log('executed service')
        return axios.put(`${CUSTOMER_API_URL}/${id}`, customer);
    }
}

export default new CustomerService()