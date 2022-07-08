import { useState, useRef, EventBus } from "react";
import Form from "react-validation/build/form";
import PaypalService from "../services/paypal-service";
import CheckButton from "react-validation/build/button";

const PaymentForm = ({price, appointmentId}) => {
    const form = useRef();
    const checkBtn = useRef();
    const [message, setMessage] = useState("");
    const [currency, setCurrency] = useState("USD");
    const [method, setMethod] = useState("paypal");
    const [intent, setIntent] = useState("sale");
    const [description, setDescription] = useState("a");

    const handlePayment = (e) => {
        e.preventDefault();
    
        setMessage("");
    
        form.current.validateAll();
    
          PaypalService.pay(price, currency, method, intent, description, appointmentId).then(
            (response) => {
              setMessage(response.data.message);
              console.log(response.data.replace('redirect:', ''));
              window.location.replace(response.data.replace('redirect:', ''));
            },
            (error) => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
    
              setMessage(resMessage);

              if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
              }
            }
          );
        
      };


    return (
        <Form onSubmit={handlePayment} ref={form}>
            <div class="col-50">
                <h3>Payment</h3>
                <label>Accepted Cards</label>
                <label htmlFor="price">Total</label>
                <input type="text" id="price" name="price" value={price} />
                <label htmlFor="currency">Currency</label>
                <input type="text" id="currency" name="currency" placeholder="Enter Currency" value="USD" />
                <label htmlFor="method">Payment Method</label>
                <input type="text" id="method" name="method" placeholder="Payment Method" value="paypal"  />
                <label htmlFor="intent">Intent</label>
                <input type="text" id="intent" name="intent" defaultValue="sale" />
                <label htmlFor="description">Payment Description</label>
                <input type="text" id="description" name="description" placeholder="Payment Description" />

            </div>

            <input type="submit" value="Continue to checkout" />
        </Form>
    );
}

export default PaymentForm;