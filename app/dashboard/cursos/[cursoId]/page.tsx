import getCursoById from "@/app/actions/getCursoById";
import React from "react";
import CursoInfo from "./components/cursoInfo";

interface IParams {
  cursoId: number;
}

const CursoId = async ({ params }: { params: IParams }) => {
  const cursoInfo = await getCursoById(params.cursoId);
  if (!cursoInfo) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">Ocurrio un problema</div>
      </div>
    );
  }
  return (
    <div className="px-10 space-y-5 ">
      <div className="text-center text-3xl font-semibold">
        Bienvenido al curso
      </div>
      <CursoInfo curso={cursoInfo} />
    </div>
  );
};

export default CursoId;
