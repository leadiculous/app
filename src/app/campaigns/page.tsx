import { Button } from "@/components/ui/button";
import { getCampaigns } from "@/server/services/campaign";
import dynamic from "next/dynamic";
import { auth } from "@clerk/nextjs/server";
import { CampaignFormDialog } from "./_components/campaign-form";
import { DataTable } from "./_components/data-table";

// TODO: instead of enforcing this to be a client-side component only, we should make changes to retrieve the active theme server side so we can render the corresponding SVG server side.
const EmptyStatePlaceholder = dynamic(
  () => import("./_components/empty-state-placeholder"),
  {
    ssr: false,
  },
);

export default async function Campaigns() {
  const { userId } = auth().protect();

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
            <CampaignFormDialog>
              <Button className="mt-4">Create my first campaign</Button>
            </CampaignFormDialog>
          </div>
        </div>
      )}
      {campaigns.length > 0 && (
        <>
          <CampaignFormDialog>
            <Button>New campaign</Button>
          </CampaignFormDialog>
          <DataTable data={campaigns} />
        </>
      )}
    </>
  );
}
