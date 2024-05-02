'use client'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { PencilSquareIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

import axios from "axios";
import { Rol, User } from "@prisma/client";

interface ModalUsariosProps {
  data: User;
  roles: Rol[]
}
const ModificarUsarios: React.FC<ModalUsariosProps> = ({ data, roles }) => {
  const [open, setOpen] = useState(false);
  


  const [checked, setChecked] = useState(true);
  const [typeInp, setTypInp] = useState("text");

  const [info, setInfo] = useState({
    user: data.user,
    name: data.name,
    email: data.email,
    rolId: data.rolId
  });

  const handleInput = (event: any) => {
    setInfo({ ...info, [event.target.name]: event.target.value });
    console.log(info);
  };

  const handleCheckbox = () => {
    setChecked(!checked);
    if (checked) {
      setTypInp("password");
    } else {
      setTypInp("text");
    }
  };

  const handleSubmit = () => {
    axios
      .patch(`/api/usuario/${data.id}`, info)
      .then((res) => {
        location.reload();
        
      })
      .catch(() => {})
      .finally(() => {
        setOpen(false);
      });
  };

  return (
    <Dialog open={open}>
      <DialogTrigger>
        <PencilSquareIcon
          onClick={() => setOpen(true)}
          className="h-6 w-6 text-[#7A4EFF]"
        />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-5">Informacion del usuario</DialogTitle>
          <DialogDescription className="space-y-5">
            <Input
              name="user"
              placeholder="Usuario"
              value={info?.user || ""}
              onChange={(e) => handleInput(e)}
            />
            <Input
              name="name"
              placeholder="Nombre"
              value={info?.name || ""}
              onChange={(e) => handleInput(e)}
            />
            <Input
              name="email"
              placeholder="Email"
              value={info?.email || ""}
              onChange={(e) => handleInput(e)}
            />
            
            
            <select value={info?.rolId}  name="rolId" onChange={(e) => handleInput(e)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
              {roles.map((rol, index) => (
                <option  key={index} className="font-sans" name="rolId" value={rol.id}>
                  {rol.name}
                </option>
              ))}
            </select>

            <div className="flex flex-row justify-around">
              <Button
                onClick={() => {
                  setOpen(false);
                }}
                type="button"
                variant="outline"
                className="text-red-600"
              >
                Cancelar
              </Button>
              <Button onClick={() => handleSubmit()} type="submit">
                Actualizar
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ModificarUsarios;
