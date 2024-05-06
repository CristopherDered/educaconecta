import getDetallesCurso from "@/app/actions/getDetallesCurso";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import AvanzarButton from "./components/AvanzarButton";

interface IParams {
  cursoId: number;
}

const Detalles = async ({ params }: { params: IParams }) => {
  const detallesCurso = await getDetallesCurso(params.cursoId);
  console.log(detallesCurso);


  return (
    <div>
      <p className="text-center text-3xl font-semibold">Bienvenido al curso</p>
      <div className="grid gap-4 grid-cols-2 mt-7">
        <div>
          <div className="border-2 bg-[#ECE5FF] p-8 rounded-3xl">
            <p className="font-semibold text-lg">Descripcion del curso</p>
            {detallesCurso.descripcion}
            <Separator className="bg-gray-400 my-5" />
            <div>
              <p className="font-semibold text-lg">Informacion del docente</p>
              <p>Nombre: {detallesCurso.user.name}</p>
              <p>Correo electronico: {detallesCurso.user.email}</p>
            </div>
          </div>
        </div>

        <div className="border-2 bg-[#ECE5FF] p-8 rounded-3xl">
          <p className="font-semibold text-lg">Unidades</p>

          <Accordion type="single" collapsible>
            {detallesCurso.Unidades.map((unidad, index) => (
              <AccordionItem value={"item-" + index} key={index}>
                <AccordionTrigger>{unidad.titulo}</AccordionTrigger>
                <AccordionContent>
                  {unidad.contenido}
                  {unidad.Archivos.map((archivo, index) => (
                    <p key={index}>
                      <a
                        href={archivo.urlArchivo}
                        className="text-blue-500 underline"
                      >
                        Archivo
                      </a>
                    </p>
                  ))}

                  <div className="text-end">
                    <AvanzarButton unidadId={unidad.id} completado={unidad.completado}/>
                  </div>

                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Detalles;
