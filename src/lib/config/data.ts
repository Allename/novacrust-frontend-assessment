import { icons } from "@/assets/icons";

export const tokenOptions = [
  {
    label: "ETH",
    value: "eth",
    icon: icons.eth,
  },
  {
    label: "USDT - CELO",
    value: "celo",
    icon: icons.celo,
  },
  {
    label: "USDT - TON",
    value: "ton",
    icon: icons.ton,
  },
  {
    label: "USDT - BNB",
    value: "bnb",
    icon: icons.bnb,
  },
];

export const fiatOptions = [
  {
    label: "NGN",
    value: "ngn",
    // No icon available in assets; dropdown supports icon-less options
  },
];

export const payFromOptions = [
  { label: "Metamask", value: "metamask", icon: icons.metaMask },
  { label: "Rainbow", value: "rainbow", icon: icons.rainbow },
  { label: "WalletConnect", value: "walletconnect", icon: icons.walletConnect },
  {
    label: "Other Crypto Wallets (Binance, Coinbase, Bybit etc)",
    value: "others",
    icon: icons.others,
  },
];

export const payToOptions = [
  { label: "Bank Transfer", value: "bank", icon: icons.others },
  // { label: "Mobile Money", value: "momo", icon: icons.others },
];