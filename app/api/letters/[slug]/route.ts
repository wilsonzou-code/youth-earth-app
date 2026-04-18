import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const letter = await prisma.letter.findUnique({
    where: { slug, published: true },
    include: { author: true },
  });

  if (!letter) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(letter);
}
