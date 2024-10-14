import {ReactNode} from "react";
import {GoogleLogin} from "@react-oauth/google";

function handleGoogleLogin(): ReactNode
{
    return <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        useOneTap
    />;
}

function handleSuccess(){

}

function handleError(){

}

export {handleGoogleLogin}