import { createFileRoute, redirect } from "@tanstack/react-router";
import AccordionPage from "@/features/accordion/pages";

export const Route = createFileRoute("/accordion")({
  component: RouteComponent,
  beforeLoad: ({ context, location }) => {
    console.log(context.auth);
    if (!context.auth.user && !context.auth.isLoading) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

function RouteComponent() {
  return <AccordionPage />;
}
