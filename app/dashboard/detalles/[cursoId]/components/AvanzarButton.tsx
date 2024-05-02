"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React from "react";

interface AvanzarButtonProps {
  unidadId: number;
  completado: boolean;
}
const AvanzarButton: React.FC<AvanzarButtonProps> = ({ unidadId, completado }) => {
    const router = useRouter()
  const handleSubmit = () => {
    axios
      .post(`/api/avance/${unidadId}`)
      .then(() => {
        router.refresh()
      })
      .catch(() => {});
  };
  console.log(completado)

  return (
    <Button 
    variant={"outline"} onClick={() => handleSubmit()}
    disabled={completado}
    className={completado ? "bg-green-500 text-white" : ""}
    >
      MARCAR COMO HECHO
    </Button>
  );
};

export default AvanzarButton;
