import "bootstrap-icons/font/bootstrap-icons.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "leaflet/dist/leaflet.css";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { AuthProvider } from "./context/AuthContext";

import {
GoogleOAuthProvider,
} from "@react-oauth/google";

createRoot(
document.getElementById("root")
).render(

<StrictMode>

<GoogleOAuthProvider
clientId={
import.meta.env
.VITE_GOOGLE_CLIENT_ID
}
>

<AuthProvider>

<BrowserRouter>

<App />

</BrowserRouter>

</AuthProvider>

</GoogleOAuthProvider>

</StrictMode>

);