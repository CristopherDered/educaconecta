"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Curso } from "@prisma/client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WrenchScrewdriverIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";

interface CursoProps {
  cursos: Curso[];
}

const Carta: React.FC<CursoProps> = ({ cursos }) => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const currentUser = useSession();

  const handleInscripcion = (id: number) => {
    router.push("/dashboard/cursos/" + id);
  };

  const handleAdmin = (id: number) => {
    router.push("/dashboard/cursos/registrar/" + id);
  };

  const handleInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  };

  // Filtrar cursos según el valor ingresado en el input
  const filteredCursos = cursos.filter((curso) =>
    curso.nombre.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-row">
        <input
          onChange={handleInput}
          name="name"
          value={value}
          placeholder="BUSCAR CURSO"
          className="form-input text-center block w-full rounded-full border-2 border-[#7A4EFF] py-5 text-xl text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
        />
      </div>
      <div className=" mt-10 grid grid-cols-3 space-y-5">
        {filteredCursos.map((curso) => (
          <Card key={curso.id} className="w-[380px]">
            <CardHeader>
              <div className="flex flex-row justify-around items-center">
                <CardTitle>{curso.nombre}</CardTitle>
                {(curso.user.email === currentUser.data?.user?.email || curso.user.rol.editarCurso) && (
                  <Button
                    variant="outline"
                    onClick={() => handleAdmin(curso.id)}
                  >
                    <WrenchScrewdriverIcon height={20} width={20} />
                  </Button>
                )}
              </div>
              <CardDescription>Docente: {curso.user.name}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center space-x-4 rounded-md border p-4">
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {curso.descripcion}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full justify-evenly bg-[#7A4EFF]"
                onClick={() => {
                  handleInscripcion(curso.id);
                }}
              >
                Detalles del curso
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Carta;
