import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { published } = await req.json();
  const letter = await prisma.letter.update({ where: { id }, data: { published } });
  return NextResponse.json(letter);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.letter.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
