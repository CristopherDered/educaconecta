import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

import { useForm, SubmitHandler, set } from 'react-hook-form'

import { PencilSquareIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import axios from "axios"

interface Usuario {
    id: string,
    name: string,
    email: string,
    password: string,
    user: string
}

interface ModalUsariosProps {
    data: Usuario
}


const ModificarUsarios: React.FC<ModalUsariosProps> = ({ data }) => {

    const [open, setOpen] = useState(false);


    const [checked, setChecked] = useState(true)
    const [typeInp, setTypInp] = useState('text')

    const [info, setInfo] = useState(
        {
            id: data.id,
            user: data.user,
            name: data.name,
            email: data.email,
            password: ''
        }
    );

    const handleInput = (event: any) => {
        setInfo({ ...info, [event.target.name]: event.target.value })
        console.log(info)
    }

    const handleCheckbox = () => {
        setChecked(!checked)
        if (checked) {
            setTypInp('password')
        } else {
            setTypInp('text')
        }
    }

    const handleSubmit = () => {
        axios.put('/api/register', info)
            .then(() => {})
            .catch(() => {})
            .finally(() => {
                setOpen(false)
            })


    }




    return (
        <Dialog open={open}>
            <DialogTrigger>


                <PencilSquareIcon
                    onClick={() => setOpen(true)}
                    className="h-6 w-6 text-[#7A4EFF]" />


            </DialogTrigger>

            <DialogContent >
                <DialogHeader>
                    <DialogTitle
                        className='mb-5'>
                        Informacion del usuario
                    </DialogTitle>
                    <DialogDescription
                        className='space-y-5'>


                        <Input
                            name="user"
                            placeholder="Usuario"
                            value={info?.user}
                            onChange={(e) => handleInput(e)} />

                        <Input
                            name="name"
                            placeholder="Nombre"
                            value={info?.name}
                            onChange={(e) => handleInput(e)} />

                        <Input
                            name="email"
                            placeholder="Email"
                            value={info?.email}
                            onChange={(e) => handleInput(e)} />

                        <div className="flex w-full max-w-sm items-center space-x-2">
                            <Input
                                name="password"
                                type={typeInp}
                                value={info?.password}
                                placeholder="Contraseña"
                                onChange={(e) => handleInput(e)} />
                            <Checkbox checked={checked} onClick={() => handleCheckbox()} />
                        </div>



                        <div>

                            <Button
                                onClick={() => handleSubmit()}
                                type="submit">
                                Agregar usuario
                            </Button>

                        </div>


                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}

export default ModificarUsarios