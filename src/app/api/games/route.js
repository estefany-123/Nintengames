import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

export async function GET(request) {

  const games = await prisma.games.findMany({
    select: {
      id: true,
      title: true,
      platform: {
        select: {
          name: true
        }
      },
      category: {
        select: {
          name: true
        }
      },
      cover: true,
      year: true,
    }
  });

  return NextResponse.json(games);
}

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), "public/uploads");
  await mkdir(uploadDir, { recursive: true });

  const filePath = path.join(uploadDir, file.name);
  await writeFile(filePath, buffer);

  const title = formData.get("title")?.toString() || "";
  const platformId = Number(formData.get("platformId"));
  const categoriesId = Number(formData.get("categoriesId"));
  const year = Number(formData.get("year"));

  const games = await prisma.games.create({
    data: {
      title,
      platformId,
      categoriesId,
      year,
      cover: file.name,
    },
  });

  return NextResponse.json({
    message: "Juego creado exitosamente",
  });
}
