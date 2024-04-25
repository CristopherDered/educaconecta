import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        const { email, nombre, descripcion, name } = body;

        if (!email || !nombre || !descripcion || !name) {
            return new NextResponse('Missing info', { status: 400 });
        }

        const user = await prisma.user.findUnique({
          where:{
            email: email
          }
        })

        if (!user){
          return new NextResponse('Unauthorized', { status: 401 }); 
        }

        const newCurso = await prisma.curso.create({
            data: {
                userId: user.id,
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
