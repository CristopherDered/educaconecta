import prisma from '@/app/libs/prismadb'


const getRoles = async () => {
    try {
        const roles = await prisma.rol.findMany();
        return roles;
        
    } catch (error: any) {
        return [];
    }
}

export default getRoles;