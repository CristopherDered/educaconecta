"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import Button from "@/app/components/Button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,  
} from "@/components/ui/form";

import { useSession } from "next-auth/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  nombre: z
    .string()
    .min(5, "El nombre debe de tener minimo 5 caracteres")
    .max(80, "El nombre debe de tener maximo 80 caracteres")
    .regex(/^[A-Za-z0-9][A-Za-z0-9\s]+$/i, "Nombre de curso invalido, solo se aceptan letras y numeros"),
  descripcion: z
    .string()
    .min(5, "La descripcion debe de tener minimo 5 caracteres")
    .max(190, "La descripcion debe de tener maximo 190 caracteres")
});

const Formulario = () => {
  const currentUser = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentUser?.status === "unauthenticated") {
      router.push("/");
    }
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      descripcion: "",
    },
  });

  const SubmitHandler = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    axios
      .post("/api/curso", { ...values, ...currentUser.data?.user })
      .then((nuevoCurso) => {
        router.push(`/dashboard/cursos/registrar/${nuevoCurso.data.id}`);
        toast.success("Curso creado");
      })
      .catch(() => {
        toast.error("Ocurrio un error.");
      })
      .finally(() => {
        setIsLoading(false)
      });
  };

  return (
    <div>
      <div className="text-4xl font-semibold">Informacion del curso</div>
      <div className="space-y-6 my-5 mx-32">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(SubmitHandler)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del curso</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="descripcion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripcion del curso</FormLabel>
                  <FormControl>
                    <Textarea placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isLoading} fullWidth type="submit">
              Enviar
            </Button>
          </form>
        </Form>
      </div>
      <div className=""></div>
    </div>
  );
};

export default Formulario;
