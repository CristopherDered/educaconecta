import React from 'react'
import TablaUsuarios from './components/tablaUsuarios' 
import getUsuarios from '@/app/actions/getUsarios'


const roles = async () => {
    const data = await getUsuarios()
    

    return (
        <div>
            <TablaUsuarios datos={data} />
        </div>

    )
}

export default roles