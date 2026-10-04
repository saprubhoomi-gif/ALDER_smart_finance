import { NextResponse } from "next/server";
import { db } from "@/lib/mock-db";

export async function GET() {
  const journeys = db.getJourneys();
  return NextResponse.json({ journeys });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, id, authorName, avatar, age, profession, location, salaryRange, netWorth, storyTitle, story, savingsRate, tags } = body;

    if (action === "like" && id) {
      const updated = db.likeJourney(id);
      return NextResponse.json({ success: true, journey: updated });
    }

    if (!storyTitle || !story) {
      return NextResponse.json(
        { error: "Story title and content are required" },
        { status: 400 }
      );
    }

    const newJourney = db.addJourney({
      authorName: authorName || "Anonymous Learner",
      avatar: avatar || "AL",
      age: Number(age || 27),
      profession: profession || "Financial Planning Enthusiast",
      location: location || "India",
      salaryRange: salaryRange || "₹10L - ₹15L",
      netWorth: netWorth || "₹10L",
      storyTitle,
      story,
      savingsRate: Number(savingsRate || 40),
      matchPct: Math.floor(Math.random() * 15) + 85,
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(",") : ["Financial Goal", "SIP"]),
    });

    return NextResponse.json({ success: true, journey: newJourney });
  } catch (error) {
    return NextResponse.json({ error: "Failed to post journey" }, { status: 500 });
  }
}
