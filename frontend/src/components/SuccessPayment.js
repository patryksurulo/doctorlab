import { useEffect, useState, EventBus } from "react";
import { useSearchParams } from "react-router-dom";
import PaypalService from "../services/paypal-service";


const SuccessPayment = () => {
    const [searchParams] = useSearchParams();
    const [content, setContent] = useState();

    useEffect(() => {
        PaypalService.successPay(searchParams.get("paymentId"), searchParams.get("PayerID"), searchParams.get("appointmentId")).then(
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
        <div class="alert alert-success" role="alert">
            Payment completed successfully
        </div>
    );
}

export default SuccessPayment;