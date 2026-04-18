import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function readTime(body: string) {
  return `${Math.ceil(body.split(" ").length / 200)} min read`;
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { title, name, country, body, kind } = await req.json();

  const slug = slugify(title) + "-" + Date.now();

  await prisma.$transaction(async (tx) => {
    await tx.submission.update({ where: { id }, data: { status: "approved" } });

    const existing = await tx.author.findFirst({ where: { name, countryCode: country } });
    const author = existing ?? await tx.author.create({
      data: { name, countryCode: country, bio: "" },
    });

    if (kind === "letter") {
      await tx.letter.create({
        data: {
          title,
          slug,
          body,
          excerpt: body.slice(0, 200),
          category: "letter",
          published: true,
          authorId: author.id,
        },
      });
    } else {
      await tx.article.create({
        data: {
          title,
          slug,
          body,
          category: kind,
          published: true,
          authorId: author.id,
          readTime: readTime(body),
        },
      });
    }
  });

  return NextResponse.json({ ok: true });
}
