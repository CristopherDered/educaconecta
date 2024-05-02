"use client";
import React, { useEffect, useState } from "react";
import { _, Grid } from "gridjs-react";

import Loading from "@/app/components/Loading";
import AgregarUsario from "./modal/AgregarUsarios";
import ModificarUsarios from "./modal/ModificarUsarios";
import { Rol, User } from "@prisma/client";

interface TablaUsuariosProps {
  usuarios: User[];
  roles: Rol[];
}

const TablaUsuarios: React.FC<TablaUsuariosProps> = ({ usuarios, roles }) => {

  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])


  return (
    <div className="mx-14">
      <div className="space-y-4">
        <div className="flex justify-end">
        </div>

        {
          isClient ? (
            <Grid
              data={usuarios.map((usuario: any) => [
                usuario.user,
                usuario.name,
                usuario.email,
                usuario.rol.name,
                _(<ModificarUsarios data={usuario} roles={roles} />),
              ])}
              search={false}
              pagination={{
                limit: 8,
              }}
              columns={["USUARIO", "NOMBRE COMPLETO", "CORREO", "ROL", "MODIFICAR"]}
              className={{
                table: "table text-center bor",
                thead: "bg-[#7A4EFF] text-white rounded-full",
                tbody: " ",
              }}
            />
          ) : 
          (
            <div>
              ...
            </div>
          )
          
        }

      </div>
    </div>
  );
};

export default TablaUsuarios;
