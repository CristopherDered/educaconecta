import React from "react";
import TablaUsuarios from "./components/tablaUsuarios";
import getUsuarios from "@/app/actions/getUsarios";
import getRoles from "@/app/actions/getRoles";
import AgregarUsario from "./components/modal/AgregarUsarios";
import getInfoEscuela from "@/app/actions/getInfoEscuela";
import { DirectorForm } from "./components/directorForm";
import AdjuntoForms from "./components/adjuntoForms";


const roles = async () => {
  const usuarios = await getUsuarios();
  const roles = await getRoles();
  const infoEscuela = await getInfoEscuela()

  return (
    <div>
      <div className="grid grid-cols-2 gap-12">
        <DirectorForm initialData={infoEscuela} />
       <AdjuntoForms initialData={infoEscuela}/>
      </div>
      <AgregarUsario roles={roles} />
      <TablaUsuarios usuarios={usuarios} roles={roles} />
    </div>
  );
};

export default roles;
