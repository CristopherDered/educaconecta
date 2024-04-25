import prisma from "@/app/libs/prismadb";
const getDetallesCurso = async (cursoId: number) => {
  try {
    const curso = await prisma.curso.findUnique({
      where: {
        id: parseInt(cursoId),
      },
      include: {
        user: true,
        Unidades: {
          include: {
            Archivos: true,
          },
        },
      },
    });

    return curso;
  } catch (error: any) {
    return [];
  }
};

export default getDetallesCurso;
