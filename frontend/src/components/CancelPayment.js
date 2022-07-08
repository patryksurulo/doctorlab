import { useEffect, useState, EventBus } from "react";
import { useSearchParams } from "react-router-dom";
import PaypalService from "../services/paypal-service";


const CancelPayment = () => {
    const [content, setContent] = useState();

    useEffect(() => {
        PaypalService.cancelPay().then(
            (response) => {
                setContent(response.data);
                console.log(response.data.message);
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setContent(resMessage);

                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout");
                  }
            }
        );
    });



    return (
        <div class="alert alert-primary" role="alert">
            The payment has been canceled
        </div>
    );
}

export default CancelPayment;