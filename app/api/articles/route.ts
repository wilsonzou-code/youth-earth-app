import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  const articles = await prisma.article.findMany({
    where: {
      published: true,
      ...(category ? { category } : {}),
    },
    include: { author: true },
    orderBy: { publishedAt: "desc" },
  });

  return NextResponse.json(articles);
}
