import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    const { id } = await params;


    const game = await prisma.games.findUnique({
      where: {
        id: Number(id), 
      },
      select: {
        id: true,
        title: true,
        cover: true,
        year: true,
        version: true,
        platform: {
          select: {
            id: true,
            name: true
          }
        },
        category: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

  
    if (!game) {
      return NextResponse.json({ error: 'Juego no encontrado' }, { status: 404 });
    }

    return NextResponse.json(game, { status: 200 });
  } catch (error) {
    console.error('Error al buscar el juego:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

export async function PUT(request, {params}) {
    const { id } = await params;

    const game = await prisma.games.findUnique({
        where: {
            id: Number(id)
        }
    })

    if(!game){
        return NextResponse.json({"message":"Juego no encontrado"},404)
    }

    const formData = await request.formData();

    const file = formData.get("file");
    let fileName;
    if (file && file instanceof Blob && file.type.startsWith("image/")) {
      fileName = file.name;
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
    
      const uploadDir = path.join(process.cwd(), "public/uploads");
      await mkdir(uploadDir, { recursive: true });
    
      const filePath = path.join(uploadDir, file.name);
      await writeFile(filePath, buffer);
    } else fileName = game.cover;
  

    const title = formData.get("title")?.toString() || "";
    const platformId = Number(formData.get("platformId"));
    const categoriesId = Number(formData.get("categoriesId"));
    const year = Number(formData.get("year"));
    const version = formData.get("version")?.toString() || "";

    const upgame = await prisma.games.update({
        where:{
            id: Number(id)
        },
        data:{
          title,
          platformId,
          categoriesId,
          year,
          version,
          cover: fileName,
        }
    })

     return NextResponse.json(upgame)

}


export async function DELETE(request, {params}){

    const {id} = await params;

     const games = await prisma.games.findUnique({
        where: {
            id: Number(id)
        }
    })

    if(!games){
        return NextResponse.json({"message":"Juego no encontrado"},404)
    }

    await prisma.games.delete({
        where:{
            id:Number(id)
        }
    })

     return NextResponse.json({
        "message": "Juego eliminado exitosamente"
    })


}