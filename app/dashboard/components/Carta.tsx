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
import { useRouter } from "next/navigation";
import getCursosInscritos from "@/app/actions/getCursosInscritos";
import { getSession, useSession } from "next-auth/react";
import prisma from "@/app/libs/prismadb";
import CartaDos from "./CartaDos";

interface CartaProps {
  cursos: Array<Object>;
}

const Carta: React.FC<CartaProps> = (cursos) => {
  const router = useRouter();
  const user = useSession();

  return (
    <div className="grid grid-cols-3 space-x-10 space-y-5">
      {cursos.cursos.map((data, index) => (
        <Card key={data.id} className="w-[380px]">
          <CardHeader>
            <CardTitle>{data?.curso?.nombre}</CardTitle>
            <CardDescription>Docente: {data?.user?.name}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center space-x-4 rounded-md border p-4">
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {data?.curso?.descripcion}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="space-x-5">
            
              <Button
                className="w-full justify-evenly"
                variant={"outline"}
                onClick={() => {
                  router.push(`/dashboard/calificar/${data?.curso?.id}`);
                }}
              >
                Calificar
              </Button>
            
            <Button
              className="w-full justify-evenly bg-[#7A4EFF] text-white hover:bg-[#7A4EFF]"
              onClick={() => {
                router.push(`/dashboard/detalles/${data?.curso?.id}`);
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
