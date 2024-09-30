import { getCampaigns } from "@/server/services/campaign";
import { CampaignsDataTable } from "./_components/campaigns-data-table";
import { mustsGetAuth } from "@/server/auth";

export default async function Campaigns() {
  const user = await mustsGetAuth();

  const campaigns = await getCampaigns(user.id);

  return <CampaignsDataTable data={campaigns} />;
}
