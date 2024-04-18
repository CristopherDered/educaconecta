import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'

export async function PATCH(
    request: Request,
    { params }: { params: { cursoId: number } }
) {
    try {
        const body = await request.json();
        const { cursoId } = params;


        const curso = await prisma.curso.update({
            where:{
                id: cursoId
            },
            data:{
                ...body
            }
        })


        return NextResponse.json(curso);
    } catch (error: any) {
        console.log(error, 'REGISTRATION_ERROR')
        return new NextResponse('Internal error', { status: 500 })
    }
}
