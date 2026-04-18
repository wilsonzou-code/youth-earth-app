import "dotenv/config";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../app/generated/prisma/client";
import bcrypt from "bcryptjs";

function cleanUrl(url: string) {
  const u = new URL(url);
  u.searchParams.delete("sslmode");
  u.searchParams.delete("channel_binding");
  return u.toString();
}

const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL is not set");
const adapter = new PrismaNeon({ connectionString: cleanUrl(url) });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Authors
  const amara = await prisma.author.upsert({
    where: { id: "author-amara" },
    update: {},
    create: {
      id: "author-amara",
      name: "Amara Okonkwo",
      countryCode: "NGA",
      bio: "Water researcher and climate writer based in Lagos.",
    },
  });

  const noa = await prisma.author.upsert({
    where: { id: "author-noa" },
    update: {},
    create: { id: "author-noa", name: "Noa Berger", countryCode: "DEU" },
  });

  const ranjit = await prisma.author.upsert({
    where: { id: "author-ranjit" },
    update: {},
    create: { id: "author-ranjit", name: "Ranjit Shah", countryCode: "IND" },
  });

  const mei = await prisma.author.upsert({
    where: { id: "author-mei" },
    update: {},
    create: { id: "author-mei", name: "Mei Lin", countryCode: "TWN" },
  });

  const luiz = await prisma.author.upsert({
    where: { id: "author-luiz" },
    update: {},
    create: { id: "author-luiz", name: "Luiz Ferreira", countryCode: "BRA" },
  });

  const kofi = await prisma.author.upsert({
    where: { id: "author-kofi" },
    update: {},
    create: { id: "author-kofi", name: "Kofi Annan Jr.", countryCode: "GHA" },
  });

  const sofia = await prisma.author.upsert({
    where: { id: "author-sofia" },
    update: {},
    create: { id: "author-sofia", name: "Sofia Restrepo", countryCode: "COL" },
  });

  // Ambassadors
  const ambassadorData = [
    { authorId: amara.id, role: "Lead, West Africa", region: "West Africa" },
    { authorId: mei.id, role: "Lead, East Asia", region: "East Asia" },
    { authorId: luiz.id, role: "Lead, South America", region: "South America" },
    { authorId: noa.id, role: "Lead, Europe", region: "Europe" },
    { authorId: kofi.id, role: "Regional organizer", region: "West Africa" },
    { authorId: sofia.id, role: "Regional organizer", region: "South America" },
  ];

  for (const a of ambassadorData) {
    await prisma.ambassador.upsert({
      where: { authorId: a.authorId },
      update: {},
      create: a,
    });
  }

  // Articles
  await prisma.article.upsert({
    where: { slug: "flood-maps-lagos" },
    update: {},
    create: {
      slug: "flood-maps-lagos",
      title: "The flood maps my city ignored for a decade",
      dek: "Lagos built seawalls on yesterday's data. A new generation is building the maps that should have come first.",
      body: `On the third day of the September floods, Amara Okonkwo stopped counting how many times her school had been closed for water.

She had been tracking the water for three years — ever since her uncle's shop in Ajegunle lost its stock to a flash flood the city engineers had called "statistically unlikely." She had the engineers' report. She had her uncle's receipts.

What she did not have was a policy that listened.

This essay is the beginning of that policy. It draws on interviews with eleven Lagos residents across four neighbourhoods, flood incidence data from 2014–2024, and the municipal water planning documents obtained under a freedom of information request filed in March.`,
      category: "Climate policy",
      readTime: "6 min",
      published: true,
      publishedAt: new Date("2026-04-12"),
      authorId: amara.id,
    },
  });

  await prisma.article.upsert({
    where: { slug: "what-we-teach-climate" },
    update: {},
    create: {
      slug: "what-we-teach-climate",
      title: "What we teach when we teach climate",
      body: "Climate education in German schools has improved measurably over the past decade. What it still struggles with is specificity — the gap between knowing global temperatures are rising and understanding what that means for a particular watershed, a particular agricultural calendar, a particular city's flood insurance market.",
      category: "Education",
      readTime: "9 min",
      published: true,
      publishedAt: new Date("2026-04-10"),
      authorId: noa.id,
    },
  });

  await prisma.article.upsert({
    where: { slug: "cross-border-water-councils" },
    update: {},
    create: {
      slug: "cross-border-water-councils",
      title: "A quiet win for cross-border youth water councils",
      body: "The agreement signed in March between three South Asian youth water councils is being described in the regional press as symbolic. It is not symbolic. It is a binding memorandum with a monitoring schedule and a named contact at each signatory organisation.",
      category: "Policy",
      readTime: "5 min",
      published: true,
      publishedAt: new Date("2026-04-08"),
      authorId: ranjit.id,
    },
  });

  await prisma.article.upsert({
    where: { slug: "subsidy-not-subsidy" },
    update: {},
    create: {
      slug: "subsidy-not-subsidy",
      title: "The subsidy that stopped being a subsidy",
      body: "Taiwan's solar feed-in tariff, introduced in 2018, has been reduced three times since its peak. Each reduction was announced as a market correction. Each reduction disproportionately affected small rooftop installations — the ones most likely to be owned by individuals rather than developers.",
      category: "Climate policy",
      readTime: "7 min",
      published: true,
      publishedAt: new Date("2026-04-05"),
      authorId: mei.id,
    },
  });

  await prisma.article.upsert({
    where: { slug: "neighbourhood-committee" },
    update: {},
    create: {
      slug: "neighbourhood-committee",
      title: "A neighbourhood committee you can actually join",
      body: "The Medellín model for neighbourhood climate committees has been studied extensively. What has been studied less is why it works when it does and fails when it fails. The answer is almost always the same: whether the first three meetings are run by residents or by the municipality.",
      category: "Community",
      readTime: "4 min",
      published: true,
      publishedAt: new Date("2026-04-03"),
      authorId: sofia.id,
    },
  });

  await prisma.article.upsert({
    where: { slug: "ambassador-meetings-q1" },
    update: {},
    create: {
      slug: "ambassador-meetings-q1",
      title: "What a year of ambassador meetings taught us",
      body: "We committed to three things and delivered two. Here is what happened on the third, and what we are doing about it. Transparency in organisational reporting is not natural — it requires structure, and we did not have enough of it in Q1.",
      category: "Education",
      readTime: "8 min",
      published: true,
      publishedAt: new Date("2026-04-01"),
      authorId: kofi.id,
    },
  });

  // Letters
  await prisma.letter.upsert({
    where: { slug: "letter-ministers-cop" },
    update: {},
    create: {
      slug: "letter-ministers-cop",
      title: "To the ministers at COP: we are not a photo op",
      excerpt:
        "We came to speak, not to be photographed. If you will not publish our remarks in the minutes, publish our absence.",
      body: `We came to speak, not to be photographed. If you will not publish our remarks in the minutes, publish our absence.

We are writing this letter publicly because the private version — submitted through the official youth delegation channel — was not acknowledged. We are not angry. We are specific.

Our delegation presented three recommendations. We are asking that each be responded to in writing, by name, by the ministry that has jurisdiction over it.

The letter closes with a named signature and a specific place. We believe specificity is the minimum standard for being taken seriously.`,
      category: "Open letter",
      published: true,
      publishedAt: new Date("2026-04-11"),
      authorId: luiz.id,
    },
  });

  await prisma.letter.upsert({
    where: { slug: "letter-school-river" },
    update: {},
    create: {
      slug: "letter-school-river",
      title: "On what our school owes the river behind it",
      excerpt:
        "For six years the river has borne our runoff without complaint. A school that teaches stewardship should begin behind its own fence.",
      body: `For six years the river has borne our runoff without complaint. A school that teaches stewardship should begin behind its own fence.

We are not asking for a capital project. We are asking for a maintenance schedule, a posted contact for complaints, and a student seat on the grounds committee.

These three things together would cost nothing except attention.`,
      category: "Open letter",
      published: true,
      publishedAt: new Date("2026-04-09"),
      authorId: amara.id,
    },
  });

  await prisma.letter.upsert({
    where: { slug: "letter-grandmother" },
    update: {},
    create: {
      slug: "letter-grandmother",
      title: "A letter to my grandmother, who farmed here sixty years",
      excerpt:
        "Grandmother, the rice is late this year. You used to read the sky. I am learning to read the sky from books.",
      body: `Grandmother, the rice is late this year. You used to read the sky. I am learning to read the sky from books.

The books are good. But they do not have your patience, and they do not know this particular field.

I am writing to ask you to record, on audio, everything you remember about the planting calendar. Not the modern one. The one you used before the government one replaced it.`,
      category: "Personal",
      published: true,
      publishedAt: new Date("2026-04-07"),
      authorId: mei.id,
    },
  });

  await prisma.letter.upsert({
    where: { slug: "letter-school-lunch" },
    update: {},
    create: {
      slug: "letter-school-lunch",
      title: "On the proposed changes to the school lunch program",
      excerpt:
        "The procurement change is framed as efficiency. For the farmers supplying the district, it is not.",
      body: `The procurement change is framed as efficiency. For the farmers supplying the district, it is not.

We have spoken with seven of the twelve suppliers. Four will not be able to meet the new minimum order requirements. Three of those four have been supplying the district for over a decade.

We are asking the board to delay the vote by thirty days to allow a full impact assessment.`,
      category: "Policy",
      published: true,
      publishedAt: new Date("2026-04-05"),
      authorId: ranjit.id,
    },
  });

  // Discussions
  const d1 = await prisma.discussion.upsert({
    where: { id: "disc-performance" },
    update: {},
    create: {
      id: "disc-performance",
      title: "Is youth climate activism becoming a performance?",
      body: `Three of my classmates quit the student union last month. They said the photos of us at the march are now being used in the school's marketing materials without our consent.

I want to hear from people in other countries. Is this a local problem, or have you seen the same pattern in your student unions and NGOs?`,
      upvotes: 128,
      authorId: mei.id,
    },
  });

  const d2 = await prisma.discussion.upsert({
    where: { id: "disc-q1-notes" },
    update: {},
    create: {
      id: "disc-q1-notes",
      title: "Ambassador meeting notes: what we actually got done in Q1",
      body: "Posting our minutes publicly, as agreed. We committed to three things and delivered two. Here's what happened on the third.",
      upvotes: 64,
      authorId: kofi.id,
    },
  });

  await prisma.discussion.upsert({
    where: { id: "disc-translation" },
    update: {},
    create: {
      id: "disc-translation",
      title:
        "How do you translate \"climate\" into Indigenous languages without flattening it?",
      body: "Translating our materials into four languages. In two of them, \"climate\" as we use it does not exist. How have others handled this?",
      upvotes: 91,
      authorId: sofia.id,
    },
  });

  // Replies
  const replies = [
    { id: "reply-1", body: "This has been happening in Lagos too. The difference is our student union got wise early and started requiring written consent for any image used beyond the day of a march.", authorId: amara.id, discussionId: d1.id },
    { id: "reply-2", body: 'Asked our school counsel about this. The framing that worked was "performative use by institution" — it had legal teeth the word "consent" alone did not.', authorId: noa.id, discussionId: d1.id },
    { id: "reply-3", body: "I want to push back gently. Some of us want to be in the photos. The question is whether the request came from us or arrived after the fact.", authorId: ranjit.id, discussionId: d1.id },
    { id: "reply-4", body: "Good transparency. What was the third commitment and what's blocking it?", authorId: amara.id, discussionId: d2.id },
  ];
  for (const r of replies) {
    await prisma.reply.upsert({ where: { id: r.id }, update: {}, create: r });
  }

  // Editor account
  const hash = await bcrypt.hash("editor123", 10);
  await prisma.editorUser.upsert({
    where: { email: "editor@youth-x-earth.org" },
    update: {},
    create: {
      email: "editor@youth-x-earth.org",
      password: hash,
      name: "Editorial Team",
      role: "admin",
    },
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
