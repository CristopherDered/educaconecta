import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { cursoId, name, email } = body;

    if (!name || !cursoId || !email) {
      return new NextResponse("Missing info", { status: 400 });
    }
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const inscripcion = await prisma.inscripciones.create({
        data:{     
            cursoId,
            userId: user.id,
        }
    })

    return NextResponse.json(inscripcion);
  } catch (error: any) {
    console.log(error, "REGISTRATION_ERROR");
    return new NextResponse("Internal error", { status: 500 });
  }
}
