import React from "react";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Payment from "./payment";

const PUBLIC_KEY = "pk_test_51MUBDICGr3Ft61igWyky0aosAhx68Nl06srX5bIDSyDQGUr32PSezaXUFuEqYHgjtIFl3wy6DYkMk37G193lFgKN001xUNVubG";

const stripePromise = loadStripe(PUBLIC_KEY);

const PaymentContainer = () => {

    return (
        <Elements stripe={ stripePromise }>
            <Payment />
        </Elements>
    )
}

export default PaymentContainer;
