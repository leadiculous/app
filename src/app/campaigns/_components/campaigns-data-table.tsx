"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  createDataTableColumnHeader,
  DateTimeCell,
  TruncateCell,
} from "@/components/ui/data-table";
import { DataTable } from "@/components/ui/data-table/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type SelectCampaignSchema } from "@/shared/schemas/campaign";
import { type SelectCampaignTagSchema } from "@/shared/schemas/tags";
import { type ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Tags } from "lucide-react";
import { type PropsWithChildren } from "react";

const columns: ColumnDef<SelectCampaignSchema>[] = [
  {
    id: "select",
    size: 10,
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    size: 100,
    header: "Name",
    cell: TruncateCell,
  },
  {
    accessorKey: "description",
    size: 200,
    header: "Description",
    cell: TruncateCell,
  },
  {
    accessorKey: "createdAt",
    size: 50,
    header: createDataTableColumnHeader("Created at"),
    cell: DateTimeCell,
  },
  {
    accessorKey: "updatedAt",
    size: 50,
    header: createDataTableColumnHeader("Updated at"),
    cell: DateTimeCell,
  },
  {
    accessorKey: "tags",
    size: 30,
    header: "Tags",
    cell: ({ getValue }) => {
      const tags = getValue<SelectCampaignTagSchema[]>();

      return (
        <Button
          variant="secondary"
          size="sm"
          className="min-w-16 font-mono"
          iconLeft={<Tags />}
        >
          {tags.length}
        </Button>
      );
    },
  },
  {
    id: "actions",
    size: 30,
    cell: ({ row }) => {
      const data = row.original;

      // TODO: implement actions

      return (
        <div className="float-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>Modify</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

type CampaignsDataTableProps = {
  data: SelectCampaignSchema[];
} & PropsWithChildren;

export function CampaignsDataTable({
  data,
  children,
}: CampaignsDataTableProps) {
  return (
    <DataTable columns={columns} data={data}>
      {children}
    </DataTable>
  );
}
