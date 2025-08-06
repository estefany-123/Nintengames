import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"
import { NextResponse } from "next/server";

const prisma = new PrismaClient();


export async function POST(request) {

    try{
        const json = await request.json();
    
        const { password } = json;
    
        const passwordhash = await bcrypt.hash(password, 10)
        console.log(passwordhash);
    
        const usuario = await prisma.users.create({
            data: {
                fullname: json.fullname,
                email: json.email,
                password: passwordhash
            }
        })
        return NextResponse.json({
            "message": "usuario creado exitosamente"
        })
    }catch(error){
        console.error('Error en POST /users:', error);
    }


}

export async function GET(){
    const usuarios = await prisma.users.findMany();

    return NextResponse.json(usuarios);
}
