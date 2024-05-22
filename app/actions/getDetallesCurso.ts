import prisma from "@/app/libs/prismadb";
import getSession from "./getSession";
import { Curso, Unidades, ProgresoUsuario } from ".prisma/client";

const getDetallesCurso = async (cursoId: number) => {
  try {
    const session = await getSession();

    // Obtener el usuario de la sesión
    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email as string,
      },
    });

    // Obtener el curso con sus unidades
    const cursoWithUnidades: Curso | null = await prisma.curso.findUnique({
      where: {
        id: parseInt(cursoId),
      },
      include: {
        user: true,
        Unidades: {
          where: {
            OR:[
              {contenido: { not: null, }},
              {Archivos: {some: {urlArchivo: {not: null}}}}
            ]
          },
          include: {
            Archivos: true,

            // Incluir el progreso del usuario para cada unidad
            ProgresoUsuario: {
              where: {
                userId: user?.id,
              },
            },
          },
        },
      },
    });

    if (!cursoWithUnidades) {
      throw new Error("Curso no encontrado");
    }

    // Marcar las unidades completadas por el usuario
    const cursoConProgreso = cursoWithUnidades.Unidades.map((unidad: Unidades) => {
      const progresoUsuario = unidad.ProgresoUsuario.find((progreso: ProgresoUsuario) => progreso.completado);
      return {
        ...unidad,
        completado: progresoUsuario ? true : false,
      };
    });

    // Verificar si todas las unidades han sido completadas
    const cursoCompletado = cursoConProgreso.every((unidad: Unidades) => unidad.completado);

    // Devolver el curso con las unidades, su progreso y la variable cursoCompletado
    return {
      ...cursoWithUnidades,
      Unidades: cursoConProgreso,
      cursoCompletado,
    };
  } catch (error: any) {
    console.error("Error al obtener detalles del curso:", error);
    return null;
  }
};

export default getDetallesCurso;
