import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { published } = await req.json();
  const discussion = await prisma.discussion.update({ where: { id }, data: { published } });
  return NextResponse.json(discussion);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.discussion.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
