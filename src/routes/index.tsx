import Checkout from "@/pages/checkout";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import z from "zod";

const payoutSearchSchema = z.object({
  tab: z.enum([
    'crypto-to-cash', 
    'cash-to-crypto', 
    'crypto-to-fiat-loan'
  ]).catch('crypto-to-cash'),
}).strict();

export const Route = createFileRoute("/")({
  validateSearch: zodValidator(payoutSearchSchema),
  component: Checkout,
});
