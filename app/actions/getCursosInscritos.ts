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
                        descripcion: true,
                        Unidades: {
                            select: {
                                id: true
                            }
                        }
                    }
                }
            }
        })

        // Verificar si todas las unidades del curso están completadas para el usuario
        const cursosConEstado = await Promise.all(cursos.map(async (inscripcion) => {
            const unidadesCompletadas = await prisma.progresoUsuario.count({
                where: {
                    userId: current?.id,
                    unidad: {
                        cursoId: inscripcion.curso.id
                    },
                    completado: true
                }
            });

            return {
                ...inscripcion,
                cursoTerminado: unidadesCompletadas === inscripcion.curso.Unidades.length
            };
        }));

        return cursosConEstado;
        
    } catch (error: any) {
        console.log(error)
        return [];
    }
}

export default getCursosInscritos;
