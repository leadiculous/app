"use server";

import { authActionClient } from "@/lib/type-safe-action";
import { getLead } from "@/server/services/leads";
import { z } from "zod";

export const getLeadAction = authActionClient
  .bindArgsSchemas<[leadId: z.ZodString]>([z.string()])
  .action(async ({ ctx: { userId }, bindArgsParsedInputs: [leadId] }) => {
    return getLead(userId, leadId);
  });
