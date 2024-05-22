import getSession from '@/app/actions/getSession';
import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'

export async function PATCH(
    request: Request,
    { params }: { params: { cursoId: number } }
) {
    try {
        const body = await request.json();
        const session = await getSession()
        const { cursoId } = params;

        const user = await prisma.user.findUnique({
            where: {
                email: session?.user?.email
            }
        })

        if (!user) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        if (body.nombre) {
            // Revisamos que el curso no este creado ya
            const creadoYa = await prisma.curso.findMany({
                where: {
                    userId: user.id,
                    nombre: body.nombre
                }
            })

            if (creadoYa.length != 0) {
                return new NextResponse("curso_ya_creado", { status: 400 });
            }
        }



        const curso = await prisma.curso.update({
            where: {
                id: parseInt(cursoId)
            },
            data: {
                ...body
            }
        })


        return NextResponse.json(curso);
    } catch (error: any) {
        console.log(error, 'REGISTRATION_ERROR')
        return new NextResponse('Internal error', { status: 500 })
    }
}
