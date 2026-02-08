import 'bootswatch/dist/brite/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import keycloak from './components/auth/keycloak';

keycloak
  .init({
    onLoad: "check-sso",
    pkceMethod: "S256",
    checkLoginIframe: false,
  })
  .then(() => {
    ReactDOM.createRoot(document.getElementById("root")).render(
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    );
  })
  .catch(console.error);
