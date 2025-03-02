"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  insertCampaignSchema,
  type SelectCampaignSchema,
} from "@/lib/schemas/campaign";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { type PropsWithChildren } from "react";
import { z } from "zod";
import { createOrUpdateCampaignAction } from "../actions";
import { Alert } from "@/components/ui/alert";
import { type DialogProps } from "@radix-ui/react-dialog";

/**
 * Utility function to convert a string of tags into an array of tags.
 */
const parseTags = (str: string) =>
  str
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);

/**
 * Local schema.
 */
const schema = insertCampaignSchema.extend({
  tags: z.preprocess(
    (value) => (typeof value === "string" ? parseTags(value) : value),
    insertCampaignSchema.shape.tags,
  ),
});

export type CampaignFormProps = {
  data?: SelectCampaignSchema;
  onSave: () => void;
};

export function CampaignForm({ onSave, data }: CampaignFormProps) {
  const { form, action, handleSubmitWithAction } = useHookFormAction(
    createOrUpdateCampaignAction.bind(null, data?.publicId),
    zodResolver(schema),
    {
      actionProps: {
        onSuccess: onSave,
      },
      formProps: {
        defaultValues: {
          name: data?.name,
          description: data?.description,
          tags: data?.tags?.map(({ tag }) => tag) ?? [],
        },
      },
    },
  );

  return (
    <Form {...form}>
      <form onSubmit={handleSubmitWithAction}>
        {action.result.serverError && (
          <Alert variant="destructive">{action.result.serverError}</Alert>
        )}
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags (optional)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>Separate tags by comma.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (optional)</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" isLoading={action.isExecuting}>
            Save
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

export type CampaignFormDialogProps = Pick<
  DialogProps,
  "open" | "onOpenChange"
> &
  PropsWithChildren &
  Pick<CampaignFormProps, "data" |"onSave">;

export function CampaignFormDialog({
  children,
  data,
  onSave,
  ...props
}: CampaignFormDialogProps) {
  return (
    <Dialog {...props}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="md:max-w-xl">
        <DialogHeader>
          <DialogTitle>{data ? "Update" : "Create"} campaign</DialogTitle>
          <DialogDescription>
            Manage leads and contacts in one place.
          </DialogDescription>
        </DialogHeader>
        <CampaignForm onSave={onSave} data={data} />
      </DialogContent>
    </Dialog>
  );
}
