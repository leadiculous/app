import { getCampaigns } from "@/server/services/campaign";
import { CampaignsDataTable } from "./_components/campaigns-data-table";
import { mustsGetAuth } from "@/server/auth";

export default async function Campaigns() {
  const user = await mustsGetAuth();

  const campaigns = await getCampaigns(user.id); // TODO: switch to supabase db and use supabase's user.id instead of the clerk user.id

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">My Campaigns</h1>
      </div>
      <CampaignsDataTable data={campaigns} />
    </>
  );
}
