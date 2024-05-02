import React from "react";
import getCursos from "@/app/actions/getCursos";
import Carta from "./components/Carta";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { Button } from "@/components/ui/button";

const Cursos = async () => {
  const cursos = await getCursos();
  const session = await getCurrentUser();

  return (
    <div className=" mt-5">
      {session && <Carta cursos={cursos} editar={session.rol.editarCurso} />}
    </div>
  );
};

export default Cursos;
