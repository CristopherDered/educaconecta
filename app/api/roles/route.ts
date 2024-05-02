import bcrypt from 'bcrypt'

import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const body = await request.json(); 

        if (!body) {
            return new NextResponse('Missing info', { status: 400 });
        }

        
        const newRol = await prisma.rol.create({
            data: body
        });

        return NextResponse.json(newRol);
    } catch (error: any) {
        console.log(error, 'REGISTRATION_ERROR')
        return new NextResponse(error.meta.target, { status: 500 })
    }


}




export async function PUT(request: Request) {
    try {
        
        const body = await request.json();
        const id = body.id
        delete body['id']

        console.log(id)
        console.log(body)

        console.log(body)

        if (!body) {
            return new NextResponse('Missing info', { status: 400 });
        }

        const updatedUser = await prisma.rol.update({
            where: {
                id: id
            },
            data: body
        });

        return NextResponse.json({});
    } catch (error: any) {
        console.log(error, 'REGISTRATION_ERROR')
        return new NextResponse('Internal error', { status: 500 })
    }


}