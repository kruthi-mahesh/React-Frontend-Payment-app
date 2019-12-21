import axios from '../../node_modules/axios'

const SHOPID = 1
const PAYMENT_API_URL = 'http://localhost:8080/payment'
const SHOP_API_URL = `${PAYMENT_API_URL}/shops/${SHOPID}`

class ShopCustomerService {

    retrieveAllShopCustomers(shopId) {
        //console.log('executed service')
        return axios.get(`${SHOP_API_URL}/customers`);
    }

    retrieveShopCustomer(shopId, id) {
        //console.log('executed service')
        return axios.get(`${SHOP_API_URL}/customers/by/${id}`);
    }

    deleteShopCustomer(shopId, customerId) {
        //console.log('executed service')
        return axios.delete(`${SHOP_API_URL}/customers/${customerId}`);
    }

    updateShopCustomer(shopId, customerId, shopCustomer) {
        //console.log('executed service')
        return axios.put(`${SHOP_API_URL}/customers/${customerId}`, shopCustomer);
    }

    addShopCustomer(shopId, customerId, shopCustomer) {
        //console.log('executed service')
        return axios.post(`${SHOP_API_URL}/customers/${customerId}`, shopCustomer);
    }
}

export default new ShopCustomerService()