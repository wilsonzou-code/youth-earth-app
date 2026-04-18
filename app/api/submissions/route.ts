import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { name, country, kind, title, body } = await req.json();

  if (!name || !country || !kind || !title || !body) {
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  }

  const submission = await prisma.submission.create({
    data: { name, country, kind, title, body },
  });

  return NextResponse.json(submission, { status: 201 });
}
