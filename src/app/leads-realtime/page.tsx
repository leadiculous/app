import { mustsGetAuth } from "@/server/auth";
import { getLeads } from "@/server/services/leads";
import { LeadCard } from "./_components/lead-card";

export default async function RealtimeLeads() {
  const user = await mustsGetAuth();

  const leads = await getLeads(user.id);

  return (
    <>
      <div className="space-y-4">
        {leads.map((lead) => (
          <LeadCard key={lead.publicId} lead={lead} />
        ))}
      </div>
    </>
  );
}
