// src/components/msalInstance.js
import { PublicClientApplication } from '@azure/msal-browser';
console.log('Client ID:', process.env.REACT_APP_CLIENT_ID);
console.log('Tenant ID:', process.env.REACT_APP_TENANT_ID);
const msalConfig = {
    auth: {
        clientId: process.env.REACT_APP_CLIENT_ID,
        authority: `https://login.microsoftonline.com/${process.env.REACT_APP_TENANT_ID}`,
        redirectUri: 'http://localhost:3001'
    }
};

const msalInstance = new PublicClientApplication(msalConfig);
export default msalInstance;
