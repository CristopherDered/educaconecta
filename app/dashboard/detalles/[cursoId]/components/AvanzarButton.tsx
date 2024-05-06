"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface AvanzarButtonProps {
  unidadId: number;
  completado: boolean;
}
const AvanzarButton: React.FC<AvanzarButtonProps> = ({
  unidadId,
  completado,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = () => {
    setIsLoading(true);
    axios
      .post(`/api/avance/${unidadId}`)
      .then(() => {
        router.refresh();
        // setIsLoading(false);
      })
      .catch(() => {})
      .finally(() => {
        
      });
  };
  console.log(completado);

  return (
    <Button
      variant={"outline"}
      onClick={() => handleSubmit()}
      disabled={completado || isLoading}
      className={completado ? "bg-green-500 text-white" : ""}
    >
      MARCAR COMO HECHO
    </Button>
  );
};

export default AvanzarButton;
