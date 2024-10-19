// noinspection JSAnnotator

import {ReactNode} from "react";
import {googleLogout, useGoogleLogin} from "@react-oauth/google";
import {Customer} from "../types/types";
import axios, {AxiosResponse} from "axios";

function HandleGoogleLogin(setCustomer: (value: (((prevState: Customer) => Customer) | Customer)) => void): ReactNode {
    const googleLogin = useGoogleLogin({
        onSuccess: async ({access_token}) => {
            const userInfo = await axios.get(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                {headers: {Authorization: `Bearer ${access_token}`}},
            );

            console.log(userInfo);
            handleSuccess(setCustomer, userInfo)
        },
        onError: handleError
    });

    return <button onClick={() => googleLogin()}>Login</button>
}

function handleGoogleLogout(setCustomer: (value: (((prevState: Customer) => Customer) | Customer)) => void): ReactNode {
    return <button onClick={() => {
        googleLogout()
        setCustomer({
            customerId: "-1",
            name: "",
            email: "",
            phoneNumber: 0o0000000,
            paymentDetails: {paymentId: "-1", paymentMethod: "", cardNumber: 0o0000000}
        })
    }}>Logout</button>
}

function handleSuccess(setCustomer: (value: (((prevState: Customer) => Customer) | Customer)) => void, response: AxiosResponse<any>) {
    console.log("Success");
    const data = response.data;
    console.log(data.email);
    console.log(data.name);

    setCustomer({
        customerId: data.email,
        name: data.name,
        email: data.email,
        phoneNumber: 0o0000000,
        paymentDetails: {paymentId: "-1", paymentMethod: "", cardNumber: 0o0000000}
    });
}

function handleError() {
    console.log("Error")
}

export {HandleGoogleLogin, handleGoogleLogout}