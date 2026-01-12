import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "../src/routes/router.jsx";
import { RouterProvider } from "react-router";
import AuthProvider from "./context/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemeProvider from "./context/ThemeProvider.jsx";

// Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
