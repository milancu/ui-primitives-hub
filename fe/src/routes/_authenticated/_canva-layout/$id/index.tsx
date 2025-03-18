import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/_canva-layout/$id/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Nazdar</div>
}
