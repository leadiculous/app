import { getCampaigns } from "@/server/services/campaign";
import { auth } from "@clerk/nextjs/server";
import { CampaignsDataTable } from "./_components/campaigns-data-table";

export default async function Campaigns() {
  const { userId } = auth().protect();

  const campaigns = await getCampaigns(userId);

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">My Campaigns</h1>
      </div>
      <CampaignsDataTable data={campaigns} />
    </>
  );
}
