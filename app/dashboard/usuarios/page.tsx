import React, { useEffect, useState } from 'react'
import TablaUsuarios from './components/tablaUsuarios' 
import prisma from '@/app/libs/prismadb'




const roles = async () => {
    const data = await prisma?.user.findMany()
    

    return (
        <div>
            <TablaUsuarios datos={data} />
        </div>

    )
}

export default roles