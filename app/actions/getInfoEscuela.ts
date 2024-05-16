import prisma from '@/app/libs/prismadb'


const getInfoEscuela = async () => {
    try {
        const escuela = await prisma.escuela.findUnique({
            where:{
                id: 1
            }
        });
        return escuela || '';
        
    } catch (error: any) {
        return {};
    }
}

export default getInfoEscuela;