import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Unidades } from "@prisma/client";


interface UnidadesCursopProps {
    unidades: Unidades[]
}
const UnidadesCurso: React.FC<> = () => {
  return (
    <div className="border-2 bg-[#ECE5FF] p-8 rounded-3xl">
      <p className="font-semibold text-lg">Unidades</p>
      <Accordion type="single" collapsible>
        {detallesCurso.Unidades.map((unidad, index) => (
          <AccordionItem value={"item-" + index}>
            <AccordionTrigger>{unidad.titulo}</AccordionTrigger>
            <AccordionContent>
              {unidad.contenido}
              {unidad.Archivos.map((archivo) => (
                <p>
                  <a
                    href={archivo.urlArchivo}
                    className="text-blue-500 underline"
                  >
                    Archivo
                  </a>
                </p>
              ))}
              <div className="text-end">
                <Button variant={"outline"}>MARCAR COMO ECHO</Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default UnidadesCurso;
