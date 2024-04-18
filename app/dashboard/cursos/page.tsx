import React from 'react'
import getCursos from '@/app/actions/getCursos'
import Carta from './components/Carta'

const Cursos = async () => {

    const cursos = await getCursos()
    return (
        <div className=' mt-5'>

            <div
                className='grid grid-cols-3  space-y-5'>
                {
                    cursos.map(((info) => (
                        <div>
                            <Carta data={info} />
                        </div>
                    )))
                }
            </div>

        </div>
    )
}

export default Cursos