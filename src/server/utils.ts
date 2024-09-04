import { getReasonPhrase, type StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export const createErrorResponse = (statusCode: StatusCodes, errors?: unknown) => NextResponse.json({ message: getReasonPhrase(statusCode), errors }, { status: statusCode });
