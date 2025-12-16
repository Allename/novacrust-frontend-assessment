/* eslint-disable @typescript-eslint/no-explicit-any */
// Tab
export interface Tab {
  value: string;
  label: string;
  component: React.ReactElement;
}

//Select Dropdown
export interface SelectOption {
  label: string;
  value: string;
  icon?: any;
  disabled?: boolean;
}

// Token
export interface TokenOption {
  label: string;
  value: string;
  icon?: any;
}