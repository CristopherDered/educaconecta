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
import { PlusIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Tu rol debe tener minimo 2 caracteres")
    .max(25, "Tu rol debe tener maximo 25 caracteres")
    .regex(/^[A-Za-z0-9][A-Za-z0-9\s]+$/i, "Nombre invalido"),
});

const AgregarRoles = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const SubmitHandler = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    axios
      .post("/api/roles", values)
      .then(() => {
        toast.success("Exitoso");
        router.refresh();
        form.reset();
        setOpen(false);
      })
      .catch((error) => {
        if (error.response.data === "Rol_name_key") {
          toast.error("Este rol ya existe");
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
        <Button type="submit" secondary onClick={() => setOpen(true)}>
          <p className="text-sm font-semibold px-6">Agregar un rol</p>
          <PlusIcon className="h-6 w-6 text-[#7A4EFF]" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregue un nuevo rol</DialogTitle>
          <DialogDescription>Ingresa el nuevo nombre del rol</DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(SubmitHandler)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Correo electronico" {...field} />
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
      </DialogContent>
    </Dialog>
  );
};

export default AgregarRoles;
