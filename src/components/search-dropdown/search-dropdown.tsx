import type { TokenOption } from '@/lib/config/interfaces';
import { Popover } from '@radix-ui/react-popover'
import { useState } from 'react'
import { PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { ChevronDown } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command';
import { ReactSVG } from 'react-svg';

interface SearchDropdownProps {
  options: TokenOption[];
  value?: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

const SearchDropdown = ({
  options,
  value,
  placeholder = "Select token",
  onChange,
}: SearchDropdownProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const selected = options.find((o) => o.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="h-[36px] justify-between rounded-[20px] px-4"
        >
          <div className="flex items-center gap-2">
            {selected?.icon ? <ReactSVG src={selected.icon} /> : null}
            <span className="text-sm">{selected?.label ?? placeholder}</span>
          </div>
          <ChevronDown className="h-6 w-7 [&>svg]:text-primary" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align='end' className="w-[270px] py-[16px] px-[12px] rounded-[20px] border border-[#E0E0E0]">
        <Command>
          <div className="h-[44px] w-[240px] rounded-[20px] border border-[#E0E0E0]">
            <CommandInput placeholder="Search" />
          </div>
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  onSelect={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className="flex items-center gap-3 py-2"
                >
                  {option.icon ? <ReactSVG src={option.icon} /> : null}
                  <span>{option.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SearchDropdown