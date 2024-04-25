import React from 'react'
import prisma from '@/app/libs/prismadb'
import TablaRoles from './components/tablaRoles'



const roles = async () => {
    const data = await prisma?.rol.findMany()

    return (
        <div>
            <TablaRoles datos={data} />
        </div>

    )
}

export default roles