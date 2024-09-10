import { type HeaderContext } from "@tanstack/react-table";
import { Button } from "./button";
import { ArrowUpDown } from "lucide-react";
import React, { type PropsWithChildren, type ReactNode } from "react";

type GenericHeaderContext<T> = HeaderContext<T, unknown>;

export function SortableHeader<T>({ column, children }: GenericHeaderContext<T> & PropsWithChildren) {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {children}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
}

export function createSortableHeader<T>(children: ReactNode) {
  const header =  (props: GenericHeaderContext<T>) => <SortableHeader {...props}>{children}</SortableHeader>;
  return header;
}
