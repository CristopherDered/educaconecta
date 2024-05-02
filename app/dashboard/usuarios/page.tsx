import React from "react";
import TablaUsuarios from "./components/tablaUsuarios";
import getUsuarios from "@/app/actions/getUsarios";
import getRoles from "@/app/actions/getRoles";
import AgregarUsario from "./components/modal/AgregarUsarios";
import getInfoEscuela from "@/app/actions/getInfoEscuela";
import { DirectorForm } from "./components/directorForm";


const roles = async () => {
  const usuarios = await getUsuarios();
  const roles = await getRoles();
  const infoEscuela = await getInfoEscuela()

  return (
    <div>      
      <DirectorForm initialData={infoEscuela}  />
      <AgregarUsario  roles={roles}/>
      <TablaUsuarios usuarios={usuarios} roles={roles}  />
    </div>
  );
};

export default roles;
