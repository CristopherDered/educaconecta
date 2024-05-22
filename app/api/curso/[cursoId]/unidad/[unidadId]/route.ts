import getSession from "@/app/actions/getSession";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
interface IParams {
  cursoId: number;
  unidadId: number;
}

export async function PATCH(request: Request, { params }: { params: IParams }) {
  try {
    const body = await request.json();
    const { cursoId, unidadId } = params;

    const session = await getSession()

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email
      }
    })

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }


    if (body.titulo) {
      // Revisamos que el curso no este creado ya
      const creadoYa = await prisma.unidades.findMany({
        where: {
          titulo: body.titulo,
          cursoId: parseInt(cursoId),
        }
      })

      if (creadoYa.length != 0) {
        return new NextResponse("unidad_ya_creado", { status: 400 });
      }

    }


    const curso = await prisma.unidades.update({
      where: {
        id: parseInt(unidadId),

      },
      data: {
        ...body,
      },
    });

    return NextResponse.json(curso);
  } catch (error: any) {
    console.log(error, "REGISTRATION_ERROR");
    return new NextResponse("Internal error", { status: 500 });
  }
}
