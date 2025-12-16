import type { Tab } from "@/lib/config/interfaces";
import CashToCrypto from "./components/cash-to-crypto";
import CryptoToCash from "./components/crypto-to-cash";
import CryptoToFiatLoan from "./components/crypto-to-fiat-loan";
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

// const isPayoutTab = (val: string): val is PayoutTab =>
//   val === 'crypto-to-cash' || val === 'cash-to-crypto' || val === 'crypto-to-fiat-loan';

const Checkout = () => {
  // const { tab } = Route.useSearch();
  const router = useRouter();
  const activeTab: PayoutTab = 'crypto-to-cash'

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="max-w-[640px] w-full space-y-8 rounded-[30px] border py-8 px-4 md:px-14">
        <div className="max-w-[521px] space-y-8">
          <Tabs
            value={activeTab}
            defaultValue={activeTab}
            onValueChange={() => {
              router.navigate({
                to: "/",
                search: { tab: 'crypto-to-cash' },
              });
            }}
            className="space-y-4 bg-white w-full"
          >
            <div className="w-full overflow-x-auto pb-2">
              <TabsList className={cn('flex items-center bg-white w-full overflow-x-auto')}> 
                {TAB_OPTIONS.map(({ value, label }) => (
                  <TabsTrigger key={value} value={value} disabled={value !== 'crypto-to-cash'} className="min-w-max px-3 sm:px-4">
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
