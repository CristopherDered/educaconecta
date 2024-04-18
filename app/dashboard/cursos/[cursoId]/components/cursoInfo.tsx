import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "@heroicons/react/24/outline";
import { Curso, Unidades, Archivos } from "@prisma/client";

interface CursoInfoProps {
  curso: Curso & {
    unidades: Unidades[ ] ;
  };
}
const CursoInfo: React.FC<CursoInfoProps> = ({ curso }) => {
  console.log(curso);
  return (
    <div>
      <div>
        {curso.nombre}
      </div>
      <div>
        {curso.descripcion}
      </div>

      {
        curso.Unidades.map((unidad) => (
          <div>
            {unidad.titulo}
            {unidad.contenido}

          </div>
        ))
      }
    </div>
  );
};

export default CursoInfo;
