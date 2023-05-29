import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./styles/index.css";
import { HelmetProvider } from "react-helmet-async";

function Fallback({ error }) {
    return (
        <div role="alert">
            <p>Something went wrong:</p>
            <pre style={{ color: "red" }}>{error.message}</pre>
        </div>
    );
}
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <HelmetProvider>
            <ErrorBoundary FallbackComponent={Fallback}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </ErrorBoundary>
        </HelmetProvider>
    </React.StrictMode>
);
