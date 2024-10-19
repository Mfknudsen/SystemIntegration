import {HandleGoogleLogin, handleGoogleLogout} from "./GoogleAuthService";
import {ReactNode} from "react";
import {Customer} from "../types/types";

function HandleLogin(setCustomer: (value: (((prevState: Customer) => Customer) | Customer)) => void): ReactNode {
    try {
        return HandleGoogleLogin(setCustomer)
    } catch (e) {
        return "User services is currently down"
    }
}

function HandleLogout(setCustomer: (value: (((prevState: Customer) => Customer) | Customer)) => void): ReactNode {
    try {
        return handleGoogleLogout(setCustomer)
    }catch (e){
        return "User services is currently down"
    }
}

export {HandleLogin, HandleLogout}