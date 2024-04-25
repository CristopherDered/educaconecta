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

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";


interface Usuario {
  name: string;
  email: string;
  password: string;
  user: string;
}

interface ModalUsariosProps {}

const AgregarUsario: React.FC<ModalUsariosProps> = async ({}) => {
  const router = useRouter();
  

  const [open, setOpen] = useState(false);

  const [checked, setChecked] = useState(true);
  const [typeInp, setTypInp] = useState("text");

  const [info, setInfo] = useState({
    user: "",
    name: "",
    email: "",
    password: "",
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
      .post("/api/register", info)
      .then(() => {
        toast("Exitoso.");
        router.refresh();
      })
      .catch(() => {
        toast("Ocurrio un error.");
      })
      .finally(() => {
        setInfo({
          user: "",
          name: "",
          email: "",
          password: "",
        });

        setOpen(false);
      });
  };

  const top100Films = [
    
    { label: 'Reservoir Dogs', year: 1992 },
    { label: 'Braveheart', year: 1995 },
    { label: 'M', year: 1931 },
    { label: 'Requiem for a Dream', year: 2000 },
    { label: 'Amélie', year: 2001 },
    { label: 'A Clockwork Orange', year: 1971 },
    { label: 'Like Stars on Earth', year: 2007 },
    { label: 'Taxi Driver', year: 1976 },
    { label: 'Lawrence of Arabia', year: 1962 },
    { label: 'Double Indemnity', year: 1944 },
    {
      label: 'Eternal Sunshine of the Spotless Mind',
      year: 2004,
    },
  ];

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

            Obtener los usuarios 

            <Autocomplete
              disablePortal
              size="small"
              id="combo-box-demo"
              options={top100Films}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} placeholder="rol" />}
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
