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
                                id: true,
                                titulo: true,

                                ProgresoUsuario:{
                                    select:{
                                        completado: true

                                    },
                                    where:{
                                        userId: current?.id
                                    }
                                }
                            }
                        },
                        user:{
                            select:{
                                user: true,
                                name: true,
                                email: true,

                            }
                        }
                    }
                }
            }
        })

        const cursosConProgreso = cursos.map((curso, index) =>{
          const cursosCompletados = curso.curso.Unidades.map((unidad, index) =>{
           const progresoUsuario = unidad.ProgresoUsuario.find((progreso) => progreso.completado) 
           return {
            ...unidad,
            completado: progresoUsuario ? true : false,
           }
          })

          const isCompleto = cursosCompletados.every((unidad )=> unidad.completado)
          return {
            ...cursosCompletados,
            ...curso,
            cursoTerminado: isCompleto
          }

        })

        return cursosConProgreso
        
        
    } catch (error: any) {
        console.log(error)
        return [];
    }
}

export default getCursosInscritos;
