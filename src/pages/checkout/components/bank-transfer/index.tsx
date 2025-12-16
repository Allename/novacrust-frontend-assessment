/* eslint-disable react-hooks/incompatible-library */
import BackButton from '@/components/back-button/back-button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import SelectDropdown from '@/components/select-dropdown/select-dropdown'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useEffect, useMemo, useState } from 'react'

const bankOptions = [
  { label: 'Access Bank', value: 'ACCESS' },
  { label: 'Zenith Bank', value: 'ZENITH' },
  { label: 'GTBank', value: 'GTB' },
  { label: 'First Bank', value: 'FIRST' },
  { label: 'UBA', value: 'UBA' },
  { label: 'Fidelity Bank', value: 'FIDELITY' },
]

const schema = z.object({
  bank: z.string().min(1, 'Select a bank'),
  accountNumber: z
    .string()
    .regex(/^\d{10}$/i, 'Enter a valid 10 digit account number'),
}).strict()

type BankForm = z.infer<typeof schema>

const mockResolveAccountName = (bank: string, accountNumber: string) => {
  const map: Record<string, string> = {
    '1234567890': 'ODUTUGA GBEKE',
    '0000000000': 'JOHN DOE',
    '1111111111': 'ADA NWAKAEGO',
  }
  if (map[accountNumber]) return map[accountNumber]
  const last = accountNumber.slice(-4)
  const bankTag = bank ? bank[0] : 'A'
  return `USER ${bankTag}${last}`.toUpperCase()
}

const BankTransfer = () => {
  const form = useForm<BankForm>({
    resolver: zodResolver(schema),
    defaultValues: { bank: '', accountNumber: '' },
  })

  const bank = form.watch('bank')
  const accountNumber = form.watch('accountNumber')
  const [accountName, setAccountName] = useState('')
  const [resolving, setResolving] = useState(false)

  const canResolve = useMemo(() => bank && /^\d{10}$/.test(accountNumber), [bank, accountNumber])

  useEffect(() => {
    let active = true
    if (!canResolve) {
      setAccountName('')
      setResolving(false)
      return
    }
    setResolving(true)
    const t = setTimeout(() => {
      if (!active) return
      const name = mockResolveAccountName(bank, accountNumber)
      setAccountName(name)
      setResolving(false)
    }, 500)
    return () => {
      active = false
      clearTimeout(t)
    }
  }, [bank, accountNumber, canResolve])

  const onSubmit = (data: BankForm) => {
    const payload = { ...data, accountName }
    console.log(payload)
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="max-w-[640px] w-full space-y-8 rounded-[30px] border py-8 px-4 md:px-14">
        <div className="max-w-[521px] space-y-8">
          <div className="flex justify-between">
            <BackButton />
            <p className="text-primary text-[20px]">Recipient details</p>
            <p></p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex flex-col gap-3">
                <FormField
                  control={form.control}
                  name="bank"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary">Bank</FormLabel>
                      <FormControl>
                        <SelectDropdown
                          options={bankOptions}
                          value={field.value}
                          placeholder="Select an option"
                          onChange={(v) => field.onChange(v)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="accountNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary">
                        Account number
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          inputMode="numeric"
                          pattern="[0-9]*"
                          placeholder="Enter your account number"
                          className="h-[60px] rounded-[30px] px-6"
                          onChange={(e) => {
                            const raw = e.target.value
                              .replace(/\D/g, "")
                              .slice(0, 10);
                            field.onChange(raw);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col gap-2 mb-[30px]">
                  <p className="text-primary">Account name</p>
                  <div className="h-[60px] rounded-[30px] px-6 flex items-center bg-[#F2F2F2] text-primary font-semibold">
                    {resolving ? "Resolving…" : accountName || ""}
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={!accountName}
                className="w-full h-[60px] rounded-[30px] text-lg bg-primary"
              >
                Next
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
}

export default BankTransfer