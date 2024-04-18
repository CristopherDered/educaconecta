'use client'
import React from 'react';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PencilIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation'
import getSession from '@/app/actions/getSession';
import axios from 'axios';

interface Curso {
    id: number;
    nombre: string;
    descripcion: string;
    userId: number;
}

export default function Carta(data: any) {
    const router = useRouter();
    const currentUser = getSession()

    const info = {
        userId: currentUser.id,
        cursoId: data?.data?.id,
    }

    console.log(data)

    const handleInscripcion = () => {
        
        axios.post('/api/inscripcion', info)
            .then(() => { console.log('exitoso') })
            .catch(() => { console.log('error')})
        // router.push('/dashboard/cursos/'+data?.data?.id)
    }



    return (
        <Card key={data?.data?.id} className="w-[380px]">
            <CardHeader>
                <CardTitle>{data?.data?.nombre}</CardTitle>
                <CardDescription>Docente: {data?.data?.user?.name}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="flex items-center space-x-4 rounded-md border p-4">
                    <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {data?.data?.descripcion}
                        </p>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full justify-evenly"
                    onClick={() => {
                        handleInscripcion()
                    }}
                >
                    Entrar al curso
                    <PencilIcon height={20} width={20} />
                </Button>
            </CardFooter>
        </Card>

    );
};
