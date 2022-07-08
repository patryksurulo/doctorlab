import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080";

const pay = (price, currency, method, intent, description, appointmentId) => {
    return axios.post(API_URL + "/pay",
        { price: price, currency: currency, method: method, intent: intent, description: description, appointmentId: appointmentId },
        { headers: authHeader() }
    );
};

const successPay = (paymentId, payerId, appointmentId) => {
    return axios.get(API_URL + "/pay/success", {params: {paymentId: paymentId, PayerID: payerId, appointmentId: appointmentId}, headers: authHeader()})
}

const cancelPay = () => {
    return axios.get(API_URL + "/pay/cancel", {headers: authHeader()});
}

const PaypalService = {
    pay,
    successPay,
    cancelPay
};

export default PaypalService;
