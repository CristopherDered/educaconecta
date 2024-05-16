import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
    escuelaId: number
}
export async function PATCH(
    request: Request,
    { params }: { params: IParams }
) {
  try {
    const body = await request.json();
    const { escuelaId } = params;


    if (!body) {
      return new NextResponse("Missing info", { status: 400 });
    }

    const escuela = await prisma.escuela.update({
        where:{
            id: parseInt(escuelaId)
        },
        data:{
            ...body
        }
    })

    return NextResponse.json(escuela);
  } catch (error: any) {
    console.log(error, "REGISTRATION_ERROR");
    return new NextResponse("Internal error", { status: 500 });
  }
}
