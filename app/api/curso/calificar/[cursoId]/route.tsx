import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { cursoId: number } }
) {
  try {
    const { cursoId } = params;

    const body = await request.json();

    const inscripcionUpdate = await prisma.inscripciones.update({
        where :  {
            id: 1
        },
        data:{
            ...body
        }
    })

    return NextResponse.json(inscripcionUpdate);
    
  } catch (error: any) {
    console.log(error, "REGISTRATION_ERROR");
    return new NextResponse("Internal error", { status: 500 });
  }
}
