import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.submission.update({ where: { id }, data: { status: "rejected" } });
  return NextResponse.json({ ok: true });
}
