import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { Toaster } from "@/components/ui/sonner";
import { NuqsAdapter } from "nuqs/adapters/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { MenuContextProvider } from "@/features/command-menu/components/CommandMenuContext.tsx";
import {
  AuthProvider,
  useAuth,
} from "@/features/auth/components/AuthProvider.tsx";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "@/routes.ts";

const queryClient = new QueryClient();

function InnerApp() {
  const auth = useAuth();

  return <RouterProvider router={router} context={{ auth, queryClient }} />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MenuContextProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>
          <NuqsAdapter>
            <AuthProvider>
              <InnerApp />
            </AuthProvider>
            <Toaster />
            <ReactQueryDevtools initialIsOpen={false} />
          </NuqsAdapter>
        </QueryClientProvider>
      </ThemeProvider>
    </MenuContextProvider>
  </StrictMode>,
);
