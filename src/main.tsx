import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { MainRoutes } from "./routes/routes";
import "../styles/lib.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Auth0Provider
    domain="dev-oao5tn6juzr6524f.us.auth0.com"
    clientId="NrIJXHMrb35H1EIxRN6Zg2B64m3yytr6"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <BrowserRouter>
      <MainRoutes />
    </BrowserRouter>
  </Auth0Provider>
);
