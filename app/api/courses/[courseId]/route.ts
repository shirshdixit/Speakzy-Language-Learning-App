import db from "@/db/drizzle";
import { challenges } from "@/db/schema";
import { isAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// GET a specific challenge for a specific course
export const GET = async (
  req: Request,
  { params }: { params: { courseId: string; challengeId: string } }
) => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const courseId = parseInt(params.courseId); // parse the courseId
  const challengeId = parseInt(params.challengeId); // parse the challengeId

  const data = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId),
  });

  return NextResponse.json(data);
};

// UPDATE a specific challenge for a specific course
export const PUT = async (
  req: Request,
  { params }: { params: { courseId: string; challengeId: string } }
) => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const courseId = parseInt(params.courseId); // parse the courseId
  const challengeId = parseInt(params.challengeId); // parse the challengeId
  const body = await req.json();

  const data = await db
    .update(challenges)
    .set({ ...body })
    .where(eq(challenges.id, challengeId))
    .returning();

  return NextResponse.json(data[0]);
};

// DELETE a specific challenge for a specific course
export const DELETE = async (
  req: Request,
  { params }: { params: { courseId: string; challengeId: string } }
) => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const courseId = parseInt(params.courseId); // parse the courseId
  const challengeId = parseInt(params.challengeId); // parse the challengeId

  const data = await db
    .delete(challenges)
    .where(eq(challenges.id, challengeId))
    .returning();

  return NextResponse.json(data[0]);
};
