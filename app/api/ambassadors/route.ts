import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const ambassadors = await prisma.ambassador.findMany({
    where: { active: true },
    include: { author: true },
    orderBy: { region: "asc" },
  });
  return NextResponse.json(ambassadors);
}
