'use client'
import React, { useState } from 'react'
import { _, Grid } from 'gridjs-react';


import Loading from '@/app/components/Loading';
import { Checkbox } from '@/components/ui/checkbox';
import AgregarRoles from './modal/AgregarRoles';
import axios from 'axios';
import { toast } from 'sonner';



const TablaRoles = (datos: any) => {

    const [isLoading, setIsLoading] = useState(false)

    const handleCheckBox = (info: any) => {

        axios.put('/api/roles', info)
            .then(() => { toast("Exitoso.") })
            .catch(() => { toast("Ocurrio un error.") })
            .finally(() => {

            })
    }



    return (
        <div className='mx-44 pt-20'>

            {
                isLoading
                    ? (

                        <Loading />
                    )
                    : (
                        <div
                            className='space-y-4'>

                            <div className='flex justify-end'>
                                <AgregarRoles />
                            </div>

                            <Grid
                                data={
                                    datos.datos.map((chin: any) => {
                                        return [
                                            chin.name,
                                            _(<Checkbox onClick={() => handleCheckBox({ id: chin.id, 'crear': !chin.crear },)} checked={chin.crear} />),
                                            _(<Checkbox onClick={() => handleCheckBox({ id: chin.id, 'editar': !chin.editar },)} checked={chin.editar} />),
                                            _(<Checkbox onClick={() => handleCheckBox({ id: chin.id, 'ver': chin.ver },)} checked={chin.editar} />),
                                            _(<Checkbox onClick={() => handleCheckBox({ id: chin.id, 'eliminar': !chin.eliminar },)} checked={chin.eliminar} />),
                                        ]
                                    })

                                }

                                search={false}

                                pagination={{
                                    limit: 100,
                                }}

                                columns={['ROL', 'CREAR', 'EDITAR', 'VER', 'ELIMINAR']}


                                className={{

                                    table: 'table text-center bor',
                                    thead: 'bg-[#7A4EFF] text-white rounded-full',
                                    tbody: ' ',

                                }}
                            />
                        </div>
                    )
            }
        </div>

    )
}

export default TablaRoles