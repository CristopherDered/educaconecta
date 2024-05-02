import prisma from '@/app/libs/prismadb'


const getCursos = async () => {
    try {
        const cursos = await prisma.curso.findMany(
            {
                select: {
                    id: true,
                    nombre: true,
                    descripcion: true,
                    user: {
                        select:{
                            name: true,
                            email: true,
                            id: true,
                            rol: true
                        }
                    }

                }
            }
        )

        return cursos;
    } catch (error: any) {
        return [];
    }
}

export default getCursos;