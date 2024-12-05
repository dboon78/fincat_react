import { ReactNode, SyntheticEvent } from "react";

export type MenuItem = {
  label: ReactNode | string;
  id: string;
  isSelected: boolean;
};
