import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'

const prisma = new PrismaClient();


export async function POST(request) {
    const json = await request.json();

    const {password,email} = json

    const user = await prisma.users.findUnique({
        where: {
            email: json.email
        }
    });

    if (!user) {
        return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 })
    }

    const compare = await bcrypt.compare(password, user.password)

    if (!compare) {
        return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 })
    }

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
        },
        process.env.SECRET,
        { expiresIn: '1h' }
    )

    return NextResponse.json({ "token": token })
}


