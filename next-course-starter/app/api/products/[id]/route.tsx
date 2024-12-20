import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

import { product } from "../schema";

interface Props {
  params: {
    id: number;
  };
}

export async function GET(request: NextRequest, { params }: Props) {
  const product = await prisma.product.findUnique({
    where: {
      id: +params.id,
    },
  });

  if (!product)
    return NextResponse.json({ error: "Product not found" }, { status: 404 });

  return NextResponse.json(product);
}

export async function PUT(request: NextRequest, { params }: Props) {
  const body = await request.json();
  const validation = product.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const productExists = await prisma.user.findUnique({
    where: {
      id: +params.id,
    },
  });

  if (!productExists)
    return NextResponse.json({ error: "Product Not Found " }, { status: 404 });

  const updatedProduct = await prisma.product.update({
    where: {
      id: +params.id,
    },
    data: {
      name: validation.data.name,
      price: validation.data.price,
    },
  });

  return NextResponse.json(updatedProduct);
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const productToErase = await prisma.product.findUnique({
    where: {
      id: +params.id,
    },
  });

  if (!productToErase)
    return NextResponse.json({ error: "Product Not Found " }, { status: 404 });

  await prisma.product.delete({
    where: {
      id: +params.id,
    },
  });

  return NextResponse.json({});
}
