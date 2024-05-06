import { NextResponse } from 'next/server';
import prisma from "@/app/libs/prismadb";

export async function DELETE(
  req: Request,
  { params }: { params: { unidadId: number; archivoId: number } }
) {
  try {
    const { unidadId, archivoId } = params;
    
  
    const archivo = await prisma.archivos.delete({
      where: {
        id: parseInt(archivoId)
      },
    });

    return NextResponse.json(archivo);
    
  } catch (error) {
    console.log('COURSE_ID_ATTACHMENTS', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}