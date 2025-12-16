/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable @typescript-eslint/no-explicit-any */
import SearchDropdown from "@/components/search-dropdown/search-dropdown";
import SelectDropdown from "@/components/select-dropdown/select-dropdown";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { fiatOptions, payFromOptions, payToOptions, tokenOptions } from "@/lib/config/data";
import { fiatUsdToRate, numberWithCommas, tokenUsdRates } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z
  .object({
    // payAmount: z.number().min(0.000001, "Enter an amount greater than 0"),
    payAmount: z.number()
    .refine((val) => !isNaN(val), { message: "Please enter a number" })
    .min(0.000001, "Enter an amount greater than 0"),
    payToken: z.string(),
    receiveCurrency: z.string(),
    payFrom: z.string().min(1, "Select a source"),
    payTo: z.string().min(1, "Select a destination"),
  })

type CryptoToCashForm = z.infer<typeof schema>;

const CryptoToCash = () => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      payAmount: 1,
      payToken: "eth",
      receiveCurrency: "ngn",
      payFrom: "",
      payTo: "",
    },
  });

  const payAmount = form.watch("payAmount") ?? 0;
  const payToken = form.watch("payToken") ?? "eth";
  const receiveCurrency = form.watch("receiveCurrency") ?? "ngn";

  const receiveAmount = useMemo(() => {
    const tokenUsd = tokenUsdRates[payToken] ?? 0;
    const usdToFiat = fiatUsdToRate[receiveCurrency] ?? 0;
    const value = Number(payAmount) * tokenUsd * usdToFiat;
    if (!isFinite(value)) return 0;
    return value;
  }, [payAmount, payToken, receiveCurrency]);

  const onSubmit = (data: CryptoToCashForm) => {
    const payload = {
      ...data,
      receiveAmount,
    };
    navigate({to:'/bank-transfer'})
    console.log(payload);
  };

  return (
    <div className="w-full h-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <div className="flex flex-col gap-3 border border-[#E0E0E0] rounded-[30px] p-[24px]">
              <p className="text-[#828282">You pay</p>
              <div className="flex justify-between items-center">
                <FormField
                  control={form.control}
                  name="payAmount"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          type="number"
                          value={field.value}
                          onChange={
                            (e) => field.onChange(e.target.valueAsNumber)
                            //                         field.onChange(
                            //   e.target.value === "" ? 0 : Number(e.target.value)
                            // )
                          }
                          placeholder="0.00"
                          className={cn(
                            "h-[36px] rounded-none !text-[24px] font-600 border-none pl-0"
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="payToken"
                  render={() => (
                    <FormItem>
                      <FormControl>
                        <SearchDropdown
                          options={tokenOptions}
                          value={payToken}
                          placeholder="Select token"
                          onChange={(v) =>
                            form.setValue("payToken", v, {
                              shouldValidate: true,
                              shouldDirty: true,
                            })
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex flex-col gap-3 border border-[#E0E0E0] rounded-[30px] p-[24px]">
              <p className="text-[#828282]">You receive</p>
              <div className="flex justify-between items-center">
                <FormField
                  control={form.control}
                  name={"receiveAmount" as keyof CryptoToCashForm}
                  render={() => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          value={numberWithCommas(receiveAmount || "0.00")}
                          // value={
                          //   Number.isFinite(receiveAmount)
                          //     ? receiveAmount.toLocaleString(undefined, {
                          //         maximumFractionDigits: 2,
                          //       })
                          //     : "0.00"
                          // }
                          readOnly
                          className="h-[36px] rounded-none !text-[24px] font-600 border-none pl-0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="receiveCurrency"
                  render={() => (
                    <FormItem>
                      <FormControl>
                        <SearchDropdown
                          search={false}
                          options={fiatOptions as any}
                          value={receiveCurrency}
                          placeholder="Select currency"
                          onChange={(v) =>
                            form.setValue("receiveCurrency", v as any, {
                              shouldValidate: true,
                              shouldDirty: true,
                            })
                          }
                          className="w-[150px] p-1"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="payFrom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">Pay from</FormLabel>
                  <FormControl>
                    <SelectDropdown
                      options={payFromOptions}
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
              name="payTo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">Pay to</FormLabel>
                  <FormControl>
                    <SelectDropdown
                      options={payToOptions}
                      value={field.value}
                      placeholder="Select an option"
                      onChange={(v) => field.onChange(v)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="w-full h-[60px] rounded-[30px] text-lg bg-primary"
          >
            Convert now
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CryptoToCash;
