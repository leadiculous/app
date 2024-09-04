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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getCampaigns } from "@/server/services/campaign";
import { auth } from "@clerk/nextjs/server";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import { createCampaign } from "./actions";

// TODO: instead of enforcing this to be a client-side component only, we should make changes to retrieve the active theme server side so we can render the corresponding SVG server side.
const EmptyStatePlaceholder = dynamic(
  () => import("./_components/empty-state-placeholder"),
  {
    ssr: false,
  },
);

export default async function Campaigns() {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const campaigns = await getCampaigns(userId);

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">My Campaigns</h1>
      </div>
      {campaigns.length === 0 && (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <EmptyStatePlaceholder />
            <h3 className="text-2xl font-bold tracking-tight">
              No active campaigns
            </h3>
            <p className="text-sm text-muted-foreground">
              Organize your leads and contacts in one place.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-4">Create first campaign</Button>
              </DialogTrigger>
              <DialogContent className="md:max-w-xl">
                <DialogHeader>
                  <DialogTitle>Create campaign</DialogTitle>
                  <DialogDescription>
                    Manage leads and contacts in one place.
                  </DialogDescription>
                </DialogHeader>
                <form action={createCampaign}>
                  <div className="grid gap-4 py-4">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" name="name" required />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="tags">Tags (optional)</Label>
                      <p className="text-sm text-muted-foreground">
                        Separate tags by comma.
                      </p>
                      <Input id="tags" name="tags" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="description">
                        Description (optional)
                      </Label>
                      <Textarea id="description" name="description" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}
    </>
  );
}
