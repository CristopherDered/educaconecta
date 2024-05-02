import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AgregarRoles = () => {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [info, setInfo] = useState({
    name: "",
  });

  const handleInput = (event: any) => {
    setInfo({ ...info, [event.target.name]: event.target.value });
    console.log(info);
  };

  const handleSubmit = () => {
    axios
      .post("/api/roles", info)
      .then(() => {
        toast.success("Exitoso");
        router.refresh();
        setInfo({
          name: "",
        });

        setOpen(false);
      })
      .catch((error) => {
        if (error.response.data === 'Rol_name_key'){
          toast.error("Este rol ya existe");
        } else{
          toast.error("Ocurrio un error, intentalo mas tarde");
        }  
      }) 
  };

  return (
    <Dialog open={open}>
      <DialogTrigger>
        <Button type="submit" variant="outline" onClick={() => setOpen(true)}>
          <p className="text-sm font-semibold px-6">Agregar un rol</p>
          <PlusIcon className="h-6 w-6 text-[#7A4EFF]" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle onClick={() => alert("hl")} className="mb-5">
            Nombre del rol
          </DialogTitle>
          <DialogDescription className="space-y-5">
            <Input
              name="name"
              placeholder="Nombre"
              value={info?.name}
              onChange={(e) => handleInput(e)}
            />

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
                Agregar
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AgregarRoles;
