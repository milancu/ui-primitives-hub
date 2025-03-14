import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CurrentComponentProvider from "@/components/CurrentComponentProvider.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { Toaster } from "@/components/ui/sonner";
import { NuqsAdapter } from "nuqs/adapters/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <NuqsAdapter>
          <CurrentComponentProvider>
            <App />
            <Toaster />
            <ReactQueryDevtools initialIsOpen={false} />
          </CurrentComponentProvider>
        </NuqsAdapter>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);
