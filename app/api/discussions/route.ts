import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const discussions = await prisma.discussion.findMany({
    where: { published: true },
    include: { author: true, _count: { select: { replies: true } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(discussions);
}
