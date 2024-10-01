"use client";

import { type SelectLeadSchema } from "@/lib/schemas/leads";
import { LeadCard } from "./lead-card";
import { useEffect, useState } from "react";
import { Ping, type PingProps } from "@/components/ui/ping";
import { AnimatePresence } from "framer-motion";
import * as motion from "framer-motion/client";
import { createClient } from "@/lib/supabase/client";
import { type RealtimePostgresInsertPayload } from "@supabase/supabase-js";
import { type Database } from "@/lib/supabase/types";
import { getLeadAction } from "../actions";

export type LeadCardListProps = { leads: SelectLeadSchema[] };

export function LeadCardList({ leads: initialLeads }: LeadCardListProps) {
  const [leads, setLeads] = useState(initialLeads);
  const [channelStatus, setChannelStatus] =
    useState<PingProps["variant"]>("disconnected");

  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel("leads")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "leads",
        },
        (
          payload: RealtimePostgresInsertPayload<
            Database["public"]["Tables"]["leads"]["Insert"]
          >,
        ) => {
          // TODO: handle error states

          // console.log("lead", payload);
          const leadId = payload.new.id;

          if (!leadId) {
            return;
          }

          getLeadAction(leadId)
            .then((res) => {
              // console.log("get lead res", res);
              const data = res?.data;

              if (!data) {
                return;
              }

              setLeads((state) => [data, ...state]);
            })
            .catch(console.error);
        },
      )
      .subscribe((status) => {
        if (status === "CLOSED" || status === "CHANNEL_ERROR") {
          setChannelStatus("disconnected");
        } else if (status === "SUBSCRIBED") {
          setChannelStatus("connected");
        } else {
          setChannelStatus("connecting");
        }
      });

    return () => {
      supabase.removeChannel(channel).catch(console.error);
    };
  }, []);

  return (
    <div className="space-y-4">
      <strong className="flex items-center gap-2">
        <Ping variant={channelStatus} /> {channelStatus}
      </strong>
      <AnimatePresence mode="popLayout" initial={false}>
        {leads.map((lead) => (
          <motion.div
            key={lead.id}
            initial={{ opacity: 0, x: -400, scale: 0.5 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            // exit={{ opacity: 0, x: 200, scale: 1.2 }}
            transition={{ duration: 0.6, type: "spring" }}
            layout
          >
            <LeadCard lead={lead} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
