"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Button from "@/app/components/Button";

import { toast } from "sonner";
import { Input } from "@/components/ui/input";

import { EyeIcon, EyeSlashIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Rol } from "@prisma/client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface AgregarUsarioProps {
  roles: Rol[];
}

const formSchema = z.object({
  user: z
    .string()
    .min(5, "El usario debe tener un minimo de 5 caracteres")
    .max(25, "El usario debe tener un maximo de 25 caracteres")
    .regex(
      /^[a-zA-Z0-9][a-zA-Z0-9\s]*$/i,
      "El nombre solo puede contenter letras o numeros"
    ),
  name: z
    .string()
    .min(5, "El usario debe tener un minimo de 5 caracteres")
    .max(70, "El usario debe tener un maximo de 70 caracteres")
    .regex(/^[a-zA-Z][a-zA-Z\s]*$/i, "El nombre solo puede contener letras"),
  email: z.string().email("Email invalido"),
  password: z
    .string()
    .min(6, "La contraseña debe de tener una longitud minima de 6")
    .max(170, "La contraseña debe de tener una longitud maxima de 170"),
  rolId: z.any(),
});

const AgregarUsario: React.FC<AgregarUsarioProps> = ({ roles }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [checked, setChecked] = useState(true);
  const [typeInp, setTypInp] = useState("text");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      rolId: 1,
      user: "",
    },
  });

  const handleInput = () => {
    setChecked(!checked)
    setTypInp(checked ? "password" : "text")
  };

  const SubmitHandler = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    axios
      .post("/api/register", values)
      .then(() => {
        toast("Usuario creado");
        router.refresh();
        form.reset();
        setOpen(false);
      })
      .catch((error) => {
        if (error.response.data === "User_email_key") {
          toast.error("El correo ya existe");
        } else {
          toast.error("Ocurrio un error, intentalo mas tarde");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Dialog open={open}>
      <DialogTrigger>
        <Button onClick={() => setOpen(true)}>
          <p className="text-sm font-semibold px-6">Agregar un usuario</p>
          <UserPlusIcon className="h-6 w-6 text-[#7A4EFF]" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-5">Informacion del usuario</DialogTitle>
          <DialogDescription className="space-y-5"></DialogDescription>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(SubmitHandler)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="user"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Usuario" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Nombre completo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Correo electronico" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex flex-row items-center space-x-5">
                          <Input placeholder="Contraseña" type={typeInp} {...field} />
                          {
                            checked
                              ? (<EyeIcon onClick={() => handleInput()} width={35} height={35} />)
                              : (<EyeSlashIcon onClick={() => handleInput()} width={35} height={35} />)
                          }
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rolId"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <select
                          name="rolId"
                          onChange={field.onChange}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {roles.map((rol, index) => (
                            <option
                              key={index}
                              className="font-sans"
                              name="rolId"
                              value={rol.id}
                            >
                              {rol.name}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter className="justify-between">
                  <Button
                    type="button"
                    disabled={isLoading}
                    danger
                    fullWidth
                    onClick={() => setOpen(false)}
                  >
                    Cancelar
                  </Button>

                  <Button disabled={isLoading} fullWidth type="submit">
                    Enviar
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AgregarUsario;
