"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  createDataTableColumnHeader,
  DateTimeCell,
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
import { MoreHorizontal } from "lucide-react";

const columns: ColumnDef<SelectCampaignSchema>[] = [
  {
    id: "select",
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
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ getValue }) => {
      const tags = getValue<SelectCampaignTagSchema[]>();
      return (
        <div className="flex gap-2">
          {tags.map(({ tag }) => (
            <Badge variant="secondary" key={tag}>
              {tag}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: createDataTableColumnHeader("Created at"),
    cell: DateTimeCell,
  },
  {
    accessorKey: "updatedAt",
    header: createDataTableColumnHeader("Updated at"),
    cell: DateTimeCell,
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const data = row.original;

      // TODO: delete & modify actions
      //       maybe move the actions to 2 separate buttons + confirmation modal? we don't have that many options to put in the menu below anyways.

      return (
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
      );
    },
  },
];

type CampaignsDataTableProps = {
  data: SelectCampaignSchema[];
};

export function CampaignsDataTable({ data }: CampaignsDataTableProps) {
  return <DataTable columns={columns} data={data} />;
}
