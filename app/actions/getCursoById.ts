import prisma from '@/app/libs/prismadb'


const getCursoById = async (id: number) => {
    try {
    
        const curso = await prisma.curso.findUnique({
            where: {
                id: parseInt(id)
            },
            include:{
                Unidades:{
                    include:{
                        Archivos: true
                    }
                }
            }


        });  
        
        return curso;
    } catch (error: any) {
        return [];
    }
}

export default getCursoById;