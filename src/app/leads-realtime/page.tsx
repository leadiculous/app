import { mustsGetAuth } from "@/server/auth";
import { getLeads } from "@/server/services/leads";
import { LeadCardList } from "./_components/lead-card-list";

export default async function RealtimeLeads() {
  const user = await mustsGetAuth();

  const leads = await getLeads(user.id);

  return <LeadCardList leads={leads} />;
}
