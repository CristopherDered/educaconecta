"use client";
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

import { toast } from "sonner";
import { Input } from "@/components/ui/input";

import { UserPlusIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Rol } from "@prisma/client";

interface AgregarUsarioProps {
  roles: Rol[];
}

const AgregarUsario: React.FC<AgregarUsarioProps> = ({ roles }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const [checked, setChecked] = useState(true);
  const [typeInp, setTypInp] = useState("text");

  const [info, setInfo] = useState({
    user: "",
    name: "",
    email: "",
    password: "",
    rolId: 1,
  });

  const handleInput = (event: any) => {
    setInfo({ ...info, [event.target.name]: event.target.value });
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
      .post("/api/register", info)
      .then(() => {
        toast("Exitoso.");
        router.refresh();
        setOpen(false)
      })
      .catch((error) => {
        if (error.response.data === 'User_email_key'){
            toast.error("El correo ya existe");
          } else{
            toast.error("Ocurrio un error, intentalo mas tarde");
          }

      })
  };

  return (
    <Dialog open={open}>
      <DialogTrigger>
        <Button type="submit" variant="outline" onClick={() => setOpen(true)}>
          <p className="text-sm font-semibold px-6">Agregar un usuario</p>
          <UserPlusIcon className="h-6 w-6 text-[#7A4EFF]" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle onClick={() => alert("hl")} className="mb-5">
            Informacion del usuario
          </DialogTitle>
          <DialogDescription className="space-y-5">
            <Input
              name="user"
              placeholder="Usuario"
              value={info?.user}
              onChange={(e) => handleInput(e)}
            />

            <Input
              name="name"
              placeholder="Nombre"
              value={info?.name}
              onChange={(e) => handleInput(e)}
            />

            <Input
              name="email"
              placeholder="Email"
              value={info?.email}
              onChange={(e) => handleInput(e)}
            />

            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                name="password"
                type={typeInp}
                value={info?.password}
                placeholder="Contraseña"
                onChange={(e) => handleInput(e)}
              />
              <Checkbox checked={checked} onClick={() => handleCheckbox()} />
            </div>


            <select name="rolId" onChange={(e) => handleInput(e)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
              {roles.map((rol, index) => (
                <option key={index} className="font-sans" name="rolId" value={rol.id}>
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
                Agregar usuario
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AgregarUsario;
