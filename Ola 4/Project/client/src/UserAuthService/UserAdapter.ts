import {handleGoogleLogin} from "./GoogleAuthService";
import {ReactNode} from "react";
import {Customer} from "../types/types";
function handleLogin(): ReactNode {
    try {
        return handleGoogleLogin()
    } catch (e) {
        return "User services is currently down"
    }
}

export {handleLogin}