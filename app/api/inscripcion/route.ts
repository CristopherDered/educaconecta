import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'


export async function POST(request: Request) {
    try {
        const body = await request.json();

        const { userId, cursoId } = body;


        if (!userId || !cursoId) {
            return new NextResponse('Missing info', { status: 400 });
        }

        
        const inscripcion = await prisma.inscripciones.create({
            data:{
                cursoId,
                userId,
            }
        })



        return NextResponse.json(inscripcion);
    } catch (error: any) {
        console.log(error, 'REGISTRATION_ERROR')
        return new NextResponse('Internal error', { status: 500 })
    }


}
