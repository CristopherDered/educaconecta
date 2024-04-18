import { NextResponse } from 'next/server';


import prisma from '@/app/libs/prismadb'

export async function POST(
    req: Request,
    { params }: { params: { cursoId: number } }
) {
    try {
        const { titulo } = await req.json();
        const { cursoId } = params;

        const nuevaUnidad = await prisma.unidades.create({
            data:{
                titulo,
                cursoId: parseInt(cursoId),
            }
        })
        return NextResponse.json(nuevaUnidad);
    } catch (error) {
        console.log('[CHAPTERS]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}