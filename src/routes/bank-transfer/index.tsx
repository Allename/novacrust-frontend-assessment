import BankTransfer from '@/pages/checkout/components/bank-transfer'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/bank-transfer/')({
  component: BankTransfer,
})
