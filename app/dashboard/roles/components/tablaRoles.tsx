"use client";
import React, { useState } from "react";
import { _, Grid } from "gridjs-react";

import Loading from "@/app/components/Loading";
import { Checkbox } from "@/components/ui/checkbox";
import AgregarRoles from "./modal/AgregarRoles";
import axios from "axios";
import { toast } from "sonner";
import { Rol } from "@prisma/client";
import { useRouter } from "next/navigation";


interface TablaRolesProps {
  datos: Rol[];
}
const TablaRoles: React.FC<TablaRolesProps> = ({ datos }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckBox = (info: any) => {
    axios
      .put("/api/roles", info)
      .then(() => {
        toast("Exitoso.");
        router.refresh();
      })
      .catch(() => {
        toast("Ocurrio un error.");
      })
      .finally(() => {

      });
  };

  return (
    <div className="mx-44 pt-20">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="space-y-4">
          <div className="flex justify-end">
            <AgregarRoles />
          </div>

          <Grid
            data={datos.map((chin: any) => {
              return [
                chin.name,
                _(
                  <Checkbox
                    onClick={() =>
                      handleCheckBox({
                        id: chin.id,
                        crearCurso: !chin.crearCurso,
                      })
                    }
                    checked={chin.crearCurso}
                  />
                ),
                _(
                  <Checkbox
                    onClick={() =>
                      handleCheckBox({
                        id: chin.id,
                        editarCurso: !chin.editarCurso,
                      })
                    }
                    checked={chin.editarCurso}
                  />
                ),
                _(
                  <Checkbox
                    onClick={() =>
                      handleCheckBox({ id: chin.id, roles: !chin.roles })
                    }
                    checked={chin.roles}
                  />
                ),
                _(
                  <Checkbox
                    onClick={() =>
                      handleCheckBox({ id: chin.id, usuarios: !chin.usuarios })
                    }
                    checked={chin.usuarios}
                  />
                ),
              ];
            })}
            search={false}
            pagination={{
              limit: 6,
            }}
            columns={[
              "ROL",
              "CREAR CURSO",
              "EDITAR CURSOS",
              "ROLES",
              "USUARIOS",
            ]}
            className={{
              table: "table text-center bor",
              thead: "bg-[#7A4EFF] text-white rounded-full",
              tbody: " ",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default TablaRoles;
