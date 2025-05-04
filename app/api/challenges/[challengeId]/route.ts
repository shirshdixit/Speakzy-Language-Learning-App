import db from "@/db/drizzle";
import { challenges } from "@/db/schema";
import { isAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// GET route
export const GET = async (req: Request, { params }: { params: Promise<{ challengeId: string }> }) => {
    // Check if user is admin
    if (!isAdmin()) {
        return new NextResponse("Unauthorized", { status: 403 });
    }

    const { challengeId } = await params; // Wait for the promise to resolve

    const data = await db.query.challenges.findFirst({
        where: eq(challenges.id, parseInt(challengeId)), // Ensure challengeId is parsed to number
    });

    return NextResponse.json(data);
};

// PUT route
export const PUT = async (req: Request, { params }: { params: Promise<{ challengeId: string }> }) => {
    // Check if user is admin
    if (!isAdmin()) {
        return new NextResponse("Unauthorized", { status: 403 });
    }

    const { challengeId } = await params; // Wait for the promise to resolve
    const body = await req.json();

    const data = await db.update(challenges).set({
        ...body,
    }).where(eq(challenges.id, parseInt(challengeId))).returning();

    return NextResponse.json(data[0]);
};

// DELETE route
export const DELETE = async (req: Request, { params }: { params: Promise<{ challengeId: string }> }) => {
    // Check if user is admin
    if (!isAdmin()) {
        return new NextResponse("Unauthorized", { status: 403 });
    }

    const { challengeId } = await params; // Wait for the promise to resolve

    const data = await db.delete(challenges).where(eq(challenges.id, parseInt(challengeId))).returning();

    return NextResponse.json(data[0]);
};
