import getSession from "@/app/actions/getSession";
import prisma from "@/app/libs/prismadb";

import { NextResponse } from "next/server";

interface IParams {
  unidadId: number;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    const { unidadId } = params;
    const session = await getSession();

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email as string,
      },
    });


    const avance = await prisma.progresoUsuario.create({
      data: {
        unidadId: parseInt(unidadId),
        userId: user?.id as number,
        completado: true,
      },
    });
    return NextResponse.json(avance);
    
  } catch (error: any) {
    console.log(error, "REGISTRATION_ERROR");
    return new NextResponse("Internal error", { status: 500 });
  }
}
