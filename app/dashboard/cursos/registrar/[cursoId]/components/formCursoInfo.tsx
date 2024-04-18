'use client'
import React from 'react'
import { Curso } from '@prisma/client';
import { DescriptionForm } from './descriptionForm';
import { TitleForm } from './tittuloForm';

interface FormCursoInfoPorps {
    curso: Curso
}
const FormCursoInfo: React.FC<FormCursoInfoPorps> = ({ curso }) => {
    console.log(curso)
    return (
        <div>
            <div>
                <TitleForm courseId={curso.id} initialData={{ nombre: curso.nombre }} />
            </div>
            <div>
                <DescriptionForm courseId={curso.id} initialData={curso} />
            </div>
        </div>
    )
}

export default FormCursoInfo