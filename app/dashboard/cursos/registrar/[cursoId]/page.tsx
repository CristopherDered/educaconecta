import getCursoById from '@/app/actions/getCursoById';
import React, { useState } from 'react'
import FormCursoInfo from './components/formCursoInfo';
import FormUnidadesCurso from './components/formUnidadesCurso';
import getUnidadesCursos from '@/app/actions/getUnidadesCurso';

interface IParams {
    cursoId: number;
}
const page = async ({ params }: { params: IParams }) => {
    const cursoInfo = await getCursoById(params.cursoId)
    const unidadesCurso = await getUnidadesCursos(params.cursoId)

    return (
        <div
            className='grid grid-cols-2 space-x-10'>
            <FormCursoInfo curso={cursoInfo} />


            <FormUnidadesCurso initialData={unidadesCurso}  cursoId={params.cursoId} />
        </div>
    )
}

export default page