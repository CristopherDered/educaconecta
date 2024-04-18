'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

const RegistrarCurso = () => {
    const router = useRouter();

    const handleRegistrarCurso = () => {
        router.push('/dashboard/cursos/registrar')
    }
    return (
        <div className="">
            <div
                className="  w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
                onClick={() => handleRegistrarCurso()}>
                <div className="flex flex-row items-center justify-between">
                    <div className="text-sm font-semibold px-6">
                        REGISTRAR CURSO
                    </div>

                </div>
            </div>
        </div>
    )
}

export default RegistrarCurso