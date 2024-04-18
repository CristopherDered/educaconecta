'use client'
import React, { useState } from 'react'
import { _, Grid } from 'gridjs-react';



import Loading from '@/app/components/Loading';
import AgregarUsario from './modal/AgregarUsarios';
import ModificarUsarios from './modal/ModificarUsarios';



const TablaUsuarios = (datos: Array<object>) => {
    const [isLoading, setIsLoading] = useState(false)


    return (
        <div className='mx-14 pt-20'>


            {
                isLoading
                    ? (

                        <Loading />
                    )
                    : (
                        <div
                            className='space-y-4'>

                            <div className='flex justify-end'>
                                <AgregarUsario  />
                            </div>

                            <Grid
                                data={
                                   
                                    datos.datos.map((chin: any) => [chin.user, chin.name, chin.email, "" , _(<ModificarUsarios data={chin}/>),])

                                }



                                search={false}

                                pagination={{
                                    limit: 100,
                                }}

                                columns={['USUARIO', 'NOMBRE COMPLETO', 'CORREO', 'CONTRASEÑA', 'MODIFICAR',]}


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

export default TablaUsuarios