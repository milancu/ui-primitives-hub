import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { Toaster } from "@/components/ui/sonner";
import { NuqsAdapter } from "nuqs/adapters/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { MenuContextProvider } from "@/features/command-menu/components/CommandMenuContext.tsx";
import HierarchyProvider from "@/components/hierarchy-provider.tsx";
import StatesProvider from "@/components/states-provider.tsx";
import StyleProvider from "@/components/style-provider.tsx";
import ComponentProvider from "@/components/component-provider.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MenuContextProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>
          <NuqsAdapter>
            <HierarchyProvider>
              <ComponentProvider>
                <StatesProvider>
                  <StyleProvider>
                    <App />
                    <Toaster />
                    <ReactQueryDevtools initialIsOpen={false} />
                  </StyleProvider>
                </StatesProvider>
              </ComponentProvider>
            </HierarchyProvider>
          </NuqsAdapter>
        </QueryClientProvider>
      </ThemeProvider>
    </MenuContextProvider>
  </StrictMode>,
);
