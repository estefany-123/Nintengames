import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();


export async function GET(){
    const categories = await prisma.categories.findMany();

    return NextResponse.json(categories)
}

export async function POST(request) {

    const json = await request.json();
    
    const categories = await prisma.categories.create({
        data: {
            name: json.name
        }
    })

    return NextResponse.json(categories)
}