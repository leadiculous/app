import { mustsGetAuth } from "@/server/auth";
import { getLeads } from "@/server/services/leads";
import { LeadCard } from "./_components/lead-card";

export default async function RealtimeLeads() {
  const user = await mustsGetAuth();

  const leads = await getLeads(user.id);

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Realtime leads</h1>
      </div>
      <div className="space-y-4">
        {leads.map((lead) => (
          <LeadCard key={lead.publicId} lead={lead} />
        ))}
      </div>
    </>
  );
}
