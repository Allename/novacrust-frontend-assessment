import Users from '@/pages/users'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/users/')({
  component: Users,
});