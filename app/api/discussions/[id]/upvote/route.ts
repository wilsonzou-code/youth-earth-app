import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const updated = await prisma.discussion.update({
    where: { id },
    data: { upvotes: { increment: 1 } },
    select: { upvotes: true },
  });
  return NextResponse.json(updated);
}
