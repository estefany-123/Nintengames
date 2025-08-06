import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();



export async function GET(){
    const platforms = await prisma.platforms.findMany();

    return NextResponse.json(platforms)
}

export async function POST(request) {

    const json = await request.json();
    
    const platform = await prisma.platforms.create({
        data: {
            name: json.name
        }
    })

    return NextResponse.json({
        "message": "Plataforma creada exitosamente"
    })
}