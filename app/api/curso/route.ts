import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { userId, nombre, descripcion } = body;

        if (!userId || !nombre || !descripcion) {
            return new NextResponse('Missing info', { status: 400 });
        }

        const newCurso = await prisma.curso.create({
            data: {
                userId,
                nombre,
                descripcion,
            },
        })

        const responseObj = { ...newCurso, cursoId: newCurso.id };

        return NextResponse.json(responseObj);
    } catch (error: any) {
        console.log(error, 'REGISTRATION_ERROR')
        return new NextResponse('Internal error', { status: 500 })
    }
}
