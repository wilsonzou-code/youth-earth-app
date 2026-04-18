import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const letters = await prisma.letter.findMany({
    where: { published: true },
    include: { author: true },
    orderBy: { publishedAt: "desc" },
  });
  return NextResponse.json(letters);
}
