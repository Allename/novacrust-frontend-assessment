import { icons } from "@/assets/icons";
import SelectDropdown from "@/components/select-dropdown/select-dropdown"
import { useState } from "react";

const walletOptions = [
  {
    label: "Metamask",
    value: "metamask",
    icon: icons.metaMask,
  },
  {
    label: "Rainbow",
    value: "rainbow",
    icon: icons.rainbow,
  },
  {
    label: "WalletConnect",
    value: "walletconnect",
    icon: icons.walletConnect,
  },
  {
    label: "Other Crypto Wallets (Binance, Conibase, Bybit etc)",
    value: "others",
    icon: icons.others,
  },
];

const CashToCrypto = () => {
  const [wallet, setWallet] = useState<string>('');

  return (
    <div>
      CashToCrypto
      <SelectDropdown
        options={walletOptions}
        value={wallet}
        placeholder="Select an option"
        onChange={setWallet}
      />
    </div>
  );
}

export default CashToCrypto