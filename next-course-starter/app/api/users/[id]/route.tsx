import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

import { schema } from "../schema";

interface Props {
  params: {
    id: number;
  };
}

export async function GET(request: NextRequest, { params }: Props) {
  const user = await prisma.user.findUnique({
    where: {
      id: +params.id,
    },
  });

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json(user);
}

export async function PUT(request: NextRequest, { params }: Props) {
  const body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const userExists = await prisma.user.findUnique({
    where: {
      id: +params.id,
    },
  });

  if (!userExists)
    return NextResponse.json({ error: "User Not Found " }, { status: 404 });

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (userWithSameEmail)
    return NextResponse.json({ error: "User already exists" }, { status: 400 });

  const updatedUser = await prisma.user.update({
    where: {
      id: +params.id,
    },
    data: {
      name: body.name,
      email: body.email,
    },
  });

  return NextResponse.json(updatedUser);
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const userExists = await prisma.user.findUnique({
    where: {
      id: +params.id,
    },
  });

  if (!userExists)
    return NextResponse.json({ error: "User Not Found " }, { status: 404 });

  await prisma.user.delete({
    where: {
      id: +params.id,
    },
  });

  return NextResponse.json({});
}
