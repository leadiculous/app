import { insertCampaignSchema } from "@/lib/schemas/campaign";
import { getAuth } from "@clerk/nextjs/server";
import { type NextRequest, NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import { createErrorResponse } from "@/server/utils";
import { createCampaign, getCampaigns } from "@/server/services/campaign";

export async function GET(req: NextRequest) {
  const { userId } = getAuth(req);

  if (!userId) {
    return createErrorResponse(StatusCodes.FORBIDDEN);
  }

  const res = await getCampaigns(userId);

  return NextResponse.json(res);
}

/* export async function POST(req: NextRequest) {
  const { userId } = getAuth(req);

  if (!userId) {
    return createErrorResponse(StatusCodes.FORBIDDEN);
  }

  const body = insertCampaignSchema.safeParse(req.body);

  if (!body.success) {
    return createErrorResponse(StatusCodes.BAD_REQUEST, body.error);
  }

  const res = await createCampaign(userId, body.data);

  if (!res) {
    return createErrorResponse(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Failed to find created campaign",
    );
  }

  return NextResponse.json(
    { message: "Campaign created successfully", data: res },
    { status: StatusCodes.OK },
  );
} */
