import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import type { SelectOption } from '@/lib/config/interfaces';
import { ReactSVG } from 'react-svg';

interface SelectDropdownProps {
  options: SelectOption[];
  value?: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

const SelectDropdown = ({
  options,
  value,
  placeholder = "Select an option",
  onChange,
}: SelectDropdownProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-[60px] rounded-[30px] px-6 [&>svg]:text-primary">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent align='center' className="rounded-[20px] py-[16px] px-[12px]">
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            className="p-[12px] rounded-[12px] cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <ReactSVG src={option.icon} />
              <span>{option.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectDropdown