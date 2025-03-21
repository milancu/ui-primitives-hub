import { RouterProvider } from "@tanstack/react-router";
import { router } from "./routes.ts";
import {
  AuthProvider,
  useAuth,
} from "@/features/auth/components/AuthProvider.tsx";

function InnerApp() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}

function App() {
  return (
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  );
}

export default App;
