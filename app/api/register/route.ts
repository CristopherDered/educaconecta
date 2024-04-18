import bcrypt from 'bcrypt'

import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'


export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { user, email, name, password } = body;


        if (!email || !name || !password || !user) {
            return new NextResponse('Missing info', { status: 400 });
        }
        const hashedPassword = await bcrypt.hash(password, 12)

        const newUser = await prisma.user.create({
            data: {
                user,
                email,
                name,
                hashedPassword,
                rolId: 1

            }
        });

        return NextResponse.json(newUser);
    } catch (error: any) {
        console.log(error, 'REGISTRATION_ERROR')
        return new NextResponse('Internal error', { status: 500 })
    }


}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { id, user, email, name, password } = body;


        if (!email || !name || !password || !user) {
            return new NextResponse('Missing info', { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const updatedUser = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                user,
                email,
                name,
                hashedPassword,
            }
        });




        return NextResponse.json(updatedUser);
    } catch (error: any) {
        console.log(error, 'REGISTRATION_ERROR')
        return new NextResponse('Internal error', { status: 500 })
    }


}


