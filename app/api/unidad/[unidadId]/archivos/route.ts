import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams{
    
}

export async function POST(
  req: Request,
  { params }: { params: { unidadId: number } }
) {
  try {
    const { url } = await req.json();
    console.log(url);

    const attachment = await prisma.archivos.create({
      data: {
        urlArchivo: url,
        titulo: url.split("/").pop(),
        unidadId: parseInt(params.unidadId),
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.log("COURSE_ID_ATTACHMENTS", error);
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
