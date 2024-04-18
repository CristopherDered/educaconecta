import prisma from '@/app/libs/prismadb'


const getUnidadesCursos = async (cursoId: number) => {
    try {
        const unidades = await prisma.unidades.findMany({
            where: {
                cursoId: parseInt(cursoId)
            }
        })
        return unidades;
    } catch (error: any) {
        return [];
    }
}

export default getUnidadesCursos;