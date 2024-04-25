import getCursoById from "@/app/actions/getCursoById";
import React from "react";
import CursoInfo from "./components/cursoInfo";


interface IParams {
  cursoId: number;
}

const CursoId = async ({ params }: { params: IParams }) => {
  const cursoDetalles = await getCursoById(params.cursoId);

 

  if (!cursoDetalles) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">Ocurrio un problema</div>
      </div>
    );
  }

  return (
    <div className="px-52 space-y-5 ">
      <div className="text-center text-3xl font-semibold">
        Detalles del curso
      </div>
      <CursoInfo curso={cursoDetalles} />
    </div>
  );
};

export default CursoId;
