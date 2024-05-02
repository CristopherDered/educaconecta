import prisma from '@/app/libs/prismadb'


const getCursosByName = async (cadena: string) => {
    try {
        const cursos = await prisma.curso.findMany(
            {
                select: {
                    id: true,
                    nombre: true,
                    descripcion: true,
                    user: {
                        select: {
                            name: true
                        }
                    }

                },
                where: {
                    nombre: {
                        startsWith: cadena+'%'

                    }
                }
            }
        )

        return cursos;
    } catch (error: any) {
        return [];
    }
}

export default getCursosByName;