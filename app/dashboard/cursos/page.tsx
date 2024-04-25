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
      {session && (
        <div className="grid grid-cols-3  space-y-5">
          {cursos.map((info, index) => (
            <div key={index}>
              <Carta data={info} editar={session.rol.editarCurso} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cursos;
