import {handleGoogleLogin} from "./GoogleAuthService";
import {ReactNode} from "react";

function handleLogin(): ReactNode {
    try {
        return handleGoogleLogin()
    } catch (e) {
        return "User services is currently down"
    }
}

export {handleLogin}