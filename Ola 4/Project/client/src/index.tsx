import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {GoogleOAuthProvider} from "@react-oauth/google";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={"486215960520-d35hgpabs8sgu0v35uvrg6r8nt339s3f.apps.googleusercontent.com"}>
            <App/>
        </GoogleOAuthProvider>
    </React.StrictMode>
);