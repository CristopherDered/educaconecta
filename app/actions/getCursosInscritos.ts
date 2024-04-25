import prisma from '@/app/libs/prismadb'
import { useSession } from 'next-auth/react'
import getCurrentUser from './getCurrentUser'

const getCursosInscritos = async () => {
    
    try {
        const current = await getCurrentUser()
        
       
        const cursos = await prisma.inscripciones.findMany({
            where:{
                userId: current?.id
            },
            select:{
                id: true,
                calificacion1: true,
                calificacion2: true,
                calificacion3: true,
                user:{
                    select:{
                        name: true,
                    }
                },
                curso:{
                    select:{
                        id: true,
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