import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/create-post')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/create-post"!</div>
}
