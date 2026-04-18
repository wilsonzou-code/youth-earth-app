import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { name, country, body } = await req.json();

  if (!name || !country || !body) {
    return NextResponse.json({ error: "name, country, and body required" }, { status: 400 });
  }

  // Find or create anonymous author for public replies
  let author = await prisma.author.findFirst({ where: { name, countryCode: country } });
  if (!author) {
    author = await prisma.author.create({ data: { name, countryCode: country } });
  }

  const reply = await prisma.reply.create({
    data: { body, authorId: author.id, discussionId: id },
    include: { author: true },
  });

  return NextResponse.json(reply, { status: 201 });
}
