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
import { Checkbox } from "@/components/ui/checkbox";
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
        toast("Exitoso.");
        router.refresh();
      })
      .catch(() => {
        toast("Ocurrio un error.");
      })
      .finally(() => {
        setInfo({
          name: "",
        });

        setOpen(false);
      });
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

            <div>
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
