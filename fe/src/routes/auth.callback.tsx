import { createFileRoute } from '@tanstack/react-router'
import { AuthCallback } from "@/features/auth/components/AuthCallback.tsx";

export const Route = createFileRoute('/auth/callback')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AuthCallback />;
}
