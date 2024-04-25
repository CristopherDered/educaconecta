"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Curso, Unidades } from "@prisma/client";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface CursoInfoProps {
  curso: Curso & {
    unidades: Unidades[];
  };
}
const CursoInfo: React.FC<CursoInfoProps> = ({ curso }) => {
  const user = useSession();
  const router = useRouter();
  const info = {
    cursoId: curso.id,
    ...user.data?.user,
  };

  const handleInscripcion = () => {
    axios
      .post("/api/inscripcion", info)
      .then(() => {
        console.log("exitoso");
        router.push("/dashboard/cursos/" + data?.data?.id);
      })
      .catch(() => {
        console.log("error");
      })
  };
  return (
    <div className="">
      <div className="flex flex-row space-x-5 justify-around">
        <div className="text-3xl font-semibold ">{curso.nombre}</div>
        <div>
          <Button onClick={() => handleInscripcion()}>Inscribirme</Button>
        </div>
      </div>

      <div className="space-y-2">
        <p className="font-semibold text-lg">Descripcion del curso:</p>
        <div>{curso.descripcion}</div>
      </div>

      <div>
        <p className="font-semibold text-xl mb-4">Unidades del curso</p>
        {curso.Unidades.map((unidad, index) => (
          <div className="mb-3" key={index}>
            <p className="text-base font-semibold">
              {index + 1} - {unidad.titulo}
            </p>
            <div className="ml-10">{unidad.contenido}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CursoInfo;
