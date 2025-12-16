import type { Tab } from "@/lib/config/interfaces";
import CashToCrypto from "./components/cash-to-crypto";
import CryptoToCash from "./components/crypto-to-cash";
import CryptoToFiatLoan from "./components/crypto-to-fiat-loan";
import { Route } from "@/routes";
import { useRouter } from "@tanstack/react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const TAB_OPTIONS: Tab[] = [
  {
    value: "crypto-to-cash",
    label: "Crypto to cash",
    component: <CryptoToCash />,
  },
  {
    value: "cash-to-crypto",
    label: "Cash to crypto",
    component: <CashToCrypto />,
  },
  {
    value: "crypto-to-fiat-loan",
    label: "Crypto to fiat loan",
    component: <CryptoToFiatLoan />,
  },
];



type PayoutTab = 'crypto-to-cash' | 'cash-to-crypto' | 'crypto-to-fiat-loan';

const isPayoutTab = (val: string): val is PayoutTab =>
  val === 'crypto-to-cash' || val === 'cash-to-crypto' || val === 'crypto-to-fiat-loan';

const Checkout = () => {
  const { tab } = Route.useSearch();
  const router = useRouter();

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="max-w-[640px] w-full space-y-8 rounded-[30px] border py-8 px-14">
        <div className="max-w-[521px] space-y-8">
          <Tabs
            value={tab}
            defaultValue={tab}
          onValueChange={(newTab) => {
            const nextTab: PayoutTab = isPayoutTab(newTab) ? newTab : 'crypto-to-cash';
            router.navigate({
              to: "/",
              search: { tab: nextTab },
            });
          }}
            className="space-y-4 bg-white"
          >
            <div className="w-full overflow-x-auto pb-2">
              <TabsList className={cn('flex items-center bg-white')}>
                {TAB_OPTIONS.map(({ value, label }) => (
                  <TabsTrigger key={value} value={value}>
                    {label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {TAB_OPTIONS.map(({ value, component }) => (
              <TabsContent key={value} value={value}>
                {component}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
