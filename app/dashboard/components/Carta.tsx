"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Curso, Escuela, Inscripciones, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { IdentificationIcon, TrophyIcon } from "@heroicons/react/24/outline";

interface CartaProps {
  inscripciones: Inscripciones[];
  infoEscuela: Escuela;
}
const Carta: React.FC<CartaProps> = ({ inscripciones, infoEscuela }) => {
  const router = useRouter();
  const user = useSession()

  const handleCurso = (id: number) => {
    window.open(`/dashboard/certificados/${id}`)
  }

  return (
    <div className="grid grid-cols-3 space-x-10 space-y-5">
      {inscripciones.map((inscripcion, index) => (
        <Card key={inscripcion.id} className="w-[380px]">
          <CardHeader>
            <CardTitle>{inscripcion?.curso?.nombre}</CardTitle>

            <CardDescription>
              Docente: {inscripcion?.curso?.user?.name}
            </CardDescription>
            {
              inscripcion.cursoTerminado && (
                <TrophyIcon color="#d48a00" width={25} height={25} onClick={() => handleCurso(inscripcion.curso.id)} />
              )
            }
          </CardHeader>

          <CardContent className="grid gap-4">
            <div className="flex items-center space-x-4 rounded-md border p-4">
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {inscripcion?.curso?.descripcion}
                </p>
              </div>
            </div>
          </CardContent>

          <CardFooter className="space-x-5">
            <Button
              className="w-full justify-evenly"
              variant={"outline"}
              onClick={() => {
                router.push(`/dashboard/calificar/${inscripcion?.curso?.id}`);
              }}
            >
              Calificar
            </Button>

            <Button
              className="w-full justify-evenly bg-[#7A4EFF] text-white hover:bg-[#7A4EFF]"
              onClick={() => {
                router.push(`/dashboard/detalles/${inscripcion?.curso?.id}`);
              }}
            >
              Entrar al curso
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
export default Carta;
