import { NextResponse } from "next/server";
import { isAdminRequest } from "../../../lib/server/auth";
import { getContent, setContent } from "../../../lib/server/store";
import { validateContent } from "../../../lib/server/validate-content";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getContent(), { headers: { "Cache-Control": "no-store" } });
}

export async function PUT(request: Request) {
  if (!(await isAdminRequest())) return NextResponse.json({ error: "Требуется вход" }, { status: 401 });
  try {
    const content = validateContent(await request.json());
    await setContent(content);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Некорректные данные" }, { status: 400 });
  }
}
