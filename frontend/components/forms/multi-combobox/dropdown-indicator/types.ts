export interface DropdownIndicatorProps {
  innerProps: {
    ref: React.MutableRefObject<HTMLDivElement>;
    [key: string]: unknown;
  };
  selectProps: {
    menuIsOpen: boolean;
  };
}
