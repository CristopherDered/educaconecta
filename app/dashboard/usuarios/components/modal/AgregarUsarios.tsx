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

import { toast } from "sonner"
import { Input } from "@/components/ui/input"


import { UserPlusIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import axios from "axios"



interface Usuario {
    name: string,
    email: string,
    password: string,
    user: string
}

interface ModalUsariosProps {
}


const AgregarUsario: React.FC<ModalUsariosProps> = ({ }) => {

    const [open, setOpen] = useState(false);


    const [checked, setChecked] = useState(true)
    const [typeInp, setTypInp] = useState('text')

    const [info, setInfo] = useState(
        {
            user: "",
            name: "",
            email: "",
            password: ""
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

        axios.post('/api/register', info)
            .then(() => { toast("Exitoso.") })
            .catch(() => { toast("Ocurrio un error.") })
            .finally(() => {
                setInfo({
                    user: "",
                    name: "",
                    email: "",
                    password: ""
                })

                setOpen(false)

            })


    }




    return (
        <Dialog open={open}>
            <DialogTrigger>

                <Button type="submit" variant='outline'
                    onClick={() => setOpen(true)}>
                    <p className='text-sm font-semibold px-6'>
                        Agregar un usuario
                    </p>
                    <UserPlusIcon className="h-6 w-6 text-[#7A4EFF]" />
                </Button>

            </DialogTrigger>

            <DialogContent  >
                <DialogHeader >
                    <DialogTitle onClick={() => alert("hl")}
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

export default AgregarUsario