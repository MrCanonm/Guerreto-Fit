import { ReactNode } from "react";
import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./DropdownMenu";

interface DropdownContainerProps {
  children: ReactNode;
  className?: string;
  label?: string;
  separator?: boolean;
}

interface DropdownItemProps {
  children: ReactNode;
  shortcut?: string;
  onClick?: () => void;
  className?: string;
}

const DropdownContainer = ({
  children,
  className,
  label
}: DropdownContainerProps) => {
  return (
    <DropdownMenuContent className={cn(className)} align="end">
      {label && (
        <>
          <DropdownMenuLabel>{label}</DropdownMenuLabel>
          <DropdownMenuSeparator />
        </>
      )}
      {children}
    </DropdownMenuContent>
  );
};

const DropdownItem = ({
  children,
  shortcut,
  onClick,
  className,
}: DropdownItemProps) => {
  return (
    <DropdownMenuGroup>
      <DropdownMenuItem className={cn(className)} onClick={onClick}>
        {children}
        {shortcut && <DropdownMenuShortcut>{shortcut}</DropdownMenuShortcut>}
      </DropdownMenuItem>
    </DropdownMenuGroup>
  );
};

const DropdownTrigger = DropdownMenuTrigger;
const Dropdown = DropdownMenu;
const DropdownSeparator = DropdownMenuSeparator;
const DropdownGroup = DropdownMenuGroup;
const DropdownLabel = DropdownMenuLabel;
export {
  DropdownContainer,
  DropdownItem,
  Dropdown,
  DropdownTrigger,
  DropdownSeparator,
  DropdownGroup,
  DropdownLabel,
};
