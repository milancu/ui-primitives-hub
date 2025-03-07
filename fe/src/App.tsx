import { RouterProvider } from "@tanstack/react-router";
import { router } from "./routes.ts";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
