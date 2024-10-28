// frontend/src/components/msalInstance.js
import { PublicClientApplication } from '@azure/msal-browser';

const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_CLIENT_ID,
    authority: 'https://login.microsoftonline.com/${process.env.REACT_APP_TENANT_ID}',
    redirectUri: 'http://localhost:3001'
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false
  }
};

const loginRequest = {
    scopes: [
      'User.Read',
      'Files.Read',
      'Files.Read.All',
      'Files.ReadWrite',
      'Sites.Read.All',
      'Sites.ReadWrite.All',
      'Channel.ReadBasic.All',
      'Team.ReadBasic.All', // Add this scope
      'User.Read.All',
      'Directory.Read.All'
    ]
  };

const msalInstance = new PublicClientApplication(msalConfig);
export { msalInstance, loginRequest };

