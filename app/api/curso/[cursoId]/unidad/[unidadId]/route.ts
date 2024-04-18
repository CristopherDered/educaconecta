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
