import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={10}
          containerStyle={{ top: 16, right: 16, zIndex: 999999 }}
          toastOptions={{ duration: 3500 }}
        />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
