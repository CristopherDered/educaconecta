import prisma from "@/app/libs/prismadb";

const getUnidadById = async (unidadId: number, cursoId: number) => {
  try {
    const unidad = await prisma.unidades.findUnique({
      where: {
        id: parseInt(unidadId),
        cursoId: parseInt(cursoId),
      },
      include: {
        Archivos: true
      }
    });

    
    return unidad;
  } catch (error: any) {
    console.log(error);
    return [];
  }
};

export default getUnidadById;
