'use client'
import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'sonner'

import { useSession } from "next-auth/react";


const Formulario = () => {
    const currentUser = useSession()
    const router = useRouter()

    useEffect(() => {
        if (currentUser?.status === 'unauthenticated') {
            router.push('/')
        }
    }, [])

    const [info, setInfo] = useState({
    });

    const handleInput = (event: any) => {
        setInfo({ ...info, [event.target.name]: event.target.value })
        console.log(info)
    }


    const handleSubmit = () => {
        axios.post('/api/curso', {...info, ...currentUser.data?.user})
            .then((nuevoCurso) => {
                router.push(`/dashboard/cursos/registrar/${nuevoCurso.data.id}`)
                toast("Exitoso.")
            })
            .catch(() => { toast("Ocurrio un error.") })
            .finally(() => { })

    }

    return (
        <div>
            <div
                className='text-4xl font-semibold'>
                Informacion del curso
            </div>

            <div
                className='space-y-6 my-5 mx-32'>

                <div className="w-full ">
                    <Label htmlFor="nombre">Nombre del curso</Label>
                    <Input
                        id="nombre"
                        name="nombre"
                        placeholder=""
                        value={info?.nombre}
                        onChange={(evt) => handleInput(evt)}
                        className='border-gray-950'
                    />


                </div>
                <div className="grid w-full gap-1.5">
                    <Label htmlFor="descripcion">Descripcion del curso</Label>
                    <Textarea
                        placeholder=""
                        id="descripcion"
                        name={'descripcion'}
                        value={info?.descripcion}
                        onChange={(evt) => handleInput(evt)}
                        className='border-gray-950'
                    />
                </div>

                <Button
                    onClick={() => handleSubmit()}>
                    Enviar
                </Button>
            </div>

            <div
                className=''>
            </div>

        </div>
    )
}

export default Formulario