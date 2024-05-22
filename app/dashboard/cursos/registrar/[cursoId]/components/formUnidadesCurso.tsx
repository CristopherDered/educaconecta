"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Unidades, Curso } from "@prisma/client";
import axios from "axios";
import { Loader2, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { UnidadesList } from "./unidadesList";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

interface FormUnidadesCursoProps {
  initialData: Curso[];
  cursoId: number;
}

const formSchema = z.object({
  titulo: z
    .string()
    .min(5, {message: "El nombre de la unidad debe de tener minimo 5 caracteres"})
    .max(80, "El nombre de la unidad debe de tener maximo 80 caracteres")
    .regex(
      /^[A-Za-z0-9][A-Za-z0-9\s]+$/i,
      "Nombre de la unidad invalido, solo se aceptan letras y numeros"
    ),
});

const FormUnidadesCurso: React.FC<FormUnidadesCursoProps> = ({
  initialData,
  cursoId,
}) => {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  console.log(initialData);

  const toggleCreating = () => {
    setIsCreating((prev) => !prev);
  };

  const onReorder = async (
    updateData: { id: string; position: number }[]
  ) => {};

  const onEdit = (id: string) => {
    router.push(`/dashboard/cursos/${cursoId}/unidad/${id}`);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titulo: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/curso/${cursoId}/unidad`, values);
      toast.success("Unidad creada");
      toggleCreating();
      form.reset()
      router.refresh();

    } catch (error) {
      if(error.response.data === "unidad_ya_creado"){
        toast.error("Ya has creado una unidad con este nombre");
      }else{
        toast.error("Algo salio mal, intentalo mas tarde");
      }
       
    }
  };

  const { isSubmitting, isValid } = form.formState;

  return (
    <div>
      <div className="p-4 mt-6 border rounded-md bg-slate-100">

        <div className="flex items-center justify-between font-medium">
          Unidades del curso
          <Button variant="ghost" type="button" onClick={toggleCreating}>
            {isCreating ? (
              "Cancel"
            ) : (
              <>
                <PlusCircleIcon className="w-4 h-4 mr-2" />
                Agregar unidad
              </>
            )}
          </Button>
        </div>
        {isCreating ? (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-4 space-y-4"
            >
              <FormField
                name="titulo"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={false}
                        placeholder="e.g. 'Introduccion al curso'"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isSubmitting} type="submit">
                Crear
              </Button>
            </form>
          </Form>
        ) : (
          <>
            <div className={"text-sm mt-2"}>
              {/* {!initialData.chapters.length ? (
                'No chapters'
              ) : ( */}
              <UnidadesList
                onEdit={onEdit}
                onReorder={onReorder}
                items={initialData || []}
              />
              {/* )} */}
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              {/* Arrastra y suelta para reordenar las unidades */}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default FormUnidadesCurso;
