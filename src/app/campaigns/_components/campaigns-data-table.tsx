"use client";

import { Badge } from "@/components/ui/badge";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { type SelectCampaignSchema } from "@/shared/schemas/campaign";
import { type SelectCampaignTagSchema } from "@/shared/schemas/tags";
import { type ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, PlusIcon, Tags } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { deleteCampaignsAction } from "../actions";
import { CampaignFormDialog } from "./campaign-form";

type CampaignsDataTableProps = {
  data: SelectCampaignSchema[];
};

export function CampaignsDataTable({
  data: initialData,
}: CampaignsDataTableProps) {
  const [data, setData] = useState(initialData);
  const [showFormDialog, setShowFormDialog] = useState(false);
  const [campaignToUpdate, setCampaignToUpdate] =
    useState<SelectCampaignSchema>();

  // Update table data whenever the server-side data prop changes.
  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const editCampaign = (campaign: SelectCampaignSchema) => {
    setCampaignToUpdate(campaign);
    setShowFormDialog(true);
  };

  const columns: ColumnDef<SelectCampaignSchema>[] = useMemo(
    () => [
      {
        id: "select",
        size: 10,
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
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
        cell: ({ getValue, row }) => {
          const tags = getValue<SelectCampaignTagSchema[]>();

          return (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="secondary"
                  size="sm"
                  className="min-w-16 font-mono"
                  iconLeft={<Tags />}
                >
                  {tags.length}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex justify-between">
                  <strong className="text-sm font-semibold">Tags</strong>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconLeft={<Pencil />}
                    onClick={() => editCampaign(row.original)}
                  >
                    Edit
                  </Button>
                </div>
                <Separator />
                <div className="mt-2 flex max-h-40 flex-wrap gap-2 overflow-scroll">
                  {tags.length === 0 ? (
                    <span className="text-sm text-muted-foreground">
                      No tags added yet.
                    </span>
                  ) : (
                    tags.map(({ tag }) => (
                      <Badge key={tag} variant="secondary" className="mr-1">
                        {tag}
                      </Badge>
                    ))
                  )}
                </div>
              </PopoverContent>
            </Popover>
          );
        },
      },
      {
        id: "actions",
        size: 30,
        cell: ({ row, table }) => {
          const selectedRows = table
            .getSelectedRowModel()
            .rows.filter((row) => row.getIsSelected())
            .map((row) => row.original.public_id);

          const deleteCampaign = async () => {
            if (selectedRows.length > 0) {
              setData((state) =>
                state.filter(
                  (campaign) => !selectedRows.includes(campaign.public_id),
                ),
              );
              table.resetRowSelection();
              await deleteCampaignsAction(selectedRows);
            } else {
              const campaignPublicId = row.original.public_id;
              setData((state) =>
                state.filter(
                  (campaign) => campaign.public_id !== campaignPublicId,
                ),
              );
              table.resetRowSelection();
              await deleteCampaignsAction([campaignPublicId]);
            }
          };

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
                  <DropdownMenuItem onClick={() => editCampaign(row.original)}>
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={deleteCampaign}>
                    Delete
                    {selectedRows.length > 0
                      ? ` ${selectedRows.length} selected`
                      : ""}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        },
      },
    ],
    [],
  );

  return (
    <DataTable columns={columns} data={data}>
      <CampaignFormDialog
        data={campaignToUpdate}
        open={showFormDialog}
        onOpenChange={setShowFormDialog}
        onSave={() => setShowFormDialog(false)}
      >
        <Button
          size="sm"
          iconLeft={<PlusIcon />}
          onClick={() => setCampaignToUpdate(undefined)}
        >
          New campaign
        </Button>
      </CampaignFormDialog>
    </DataTable>
  );
}
