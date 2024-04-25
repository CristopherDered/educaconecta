"use client";
import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PencilIcon, WrenchScrewdriverIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import axios from "axios";

interface Curso {
  id: number;
  nombre: string;
  descripcion: string;
  userId: number;
}

export default function Carta(data: any, editar: any) {

  const router = useRouter();
  const currentUser = useSession();
  
  const handleInscripcion = () => {
    router.push("/dashboard/cursos/" + data?.data?.id);
  };

  const handleAdmin = () => {
    router.push("/dashboard/cursos/registrar/" + data?.data?.id);
  };

  return (
    <Card key={data?.data?.id} className="w-[380px]">
      <CardHeader>
        <div className="flex flex-row justify-around items-center">
          <CardTitle>{data?.data?.nombre}</CardTitle>
          {((data.data.user.email === currentUser.data?.user?.email) || data.editar) && (
            <Button variant={"outline"} onClick={() => handleAdmin()}>
              <WrenchScrewdriverIcon height={20} width={20} />
            </Button>
          )}
        </div>
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
        <Button
          className="w-full justify-evenly bg-[#7A4EFF]"
          onClick={() => {
            handleInscripcion();
          }}
        >
          Detalles del curso
        </Button>
      </CardFooter>
    </Card>
  );
}
