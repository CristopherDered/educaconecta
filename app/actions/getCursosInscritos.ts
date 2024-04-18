import prisma from '@/app/libs/prismadb'

const getCursosInscritos = async (id: number) => {
    try {
        
        const cursos = await prisma.inscripciones.findMany({
            where:{
                userId: id
            },
            select:{
                id: true,
                user:{
                    select:{
                        name: true,
                    }
                },
                curso:{
                    select:{
                        nombre: true,
                        descripcion: true
                    }
                }
            }
        })

        return cursos;
    } catch (error: any) {
        console.log(error)
        return [];
    }
}

export default getCursosInscritos;