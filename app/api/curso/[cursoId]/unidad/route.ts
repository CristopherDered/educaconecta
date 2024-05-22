import { NextResponse } from 'next/server';


import prisma from '@/app/libs/prismadb'
import getSession from '@/app/actions/getSession';

export async function POST(
  req: Request,
  { params }: { params: { cursoId: number } }
) {
  try {
    const { titulo } = await req.json();
    const { cursoId } = params;
    const session = await getSession()

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email
      }
    })

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Revisamos que el curso no este creado ya
    const creadoYa = await prisma.unidades.findMany({
      where: {
        titulo: titulo,
        cursoId: parseInt(cursoId),
      }
    })

    if (creadoYa.length != 0) {
      return new NextResponse("unidad_ya_creado", { status: 400 });
    }

    const nuevaUnidad = await prisma.unidades.create({
      data: {
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