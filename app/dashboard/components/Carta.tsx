"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import getSession from "@/app/actions/getSession";
import getCursosInscritos from "@/app/actions/getCursosInscritos";

interface Curso {
  id: number;
  nombre: string;
  descripcion: string;
  userId: number;
}

export default async function Carta() {
  const router = useRouter();
  const currentUser = getSession();
  const cursos = await getCursosInscritos(currentUser.id);

  return (
    <div className="grid grid-cols-3 space-x-10 space-y-5">
      {cursos.map((data) => (
        <Card key={data?.id} className="w-[380px]">
          <CardHeader>
            <CardTitle>{data.curso.nombre}</CardTitle>
            <CardDescription>Docente: {data?.user?.name}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center space-x-4 rounded-md border p-4">
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {data?.curso.descripcion}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full justify-evenly"
              onClick={() => {
                console.log("click");
              }}
            >
              Entrar al curso
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
