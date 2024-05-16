import React from "react";
import Certificado from "./components/PDF";
import getInfoEscuela from "@/app/actions/getInfoEscuela";
import getCursoById from "@/app/actions/getCursoById";

interface IParams {
  cursoId: number;
}
const Page = async ({ params }: { params: IParams }) => {
  const cursoDetalles = await getCursoById(params.cursoId);
  const escuela = await getInfoEscuela()
  
  return (
    <div>
      <Certificado  curso={cursoDetalles.nombre} director={escuela?.director} profesor={cursoDetalles?.user?.name} urlFirma={escuela.url}/>
    </div>
  )
}
  ;

export default Page;