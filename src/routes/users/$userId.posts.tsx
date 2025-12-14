import UserDetail from '@/pages/users/user-detail/user-detail'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/users/$userId/posts')({
  component: UserDetail,
})