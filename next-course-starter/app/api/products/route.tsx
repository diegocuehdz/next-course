import { NextRequest, NextResponse } from "next/server";
import { product } from "./schema";

import { prisma } from "@/prisma/client";

export async function GET(request: NextRequest) {
  const products = await prisma.product.findMany();
  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = product.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const userAdded = await prisma.product.create({
    data: {
      name: validation.data.name,
      price: validation.data.price,
    },
  });

  return NextResponse.json(userAdded);
}
