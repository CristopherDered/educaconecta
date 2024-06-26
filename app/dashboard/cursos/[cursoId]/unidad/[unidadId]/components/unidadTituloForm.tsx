"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface ChapterTitleFormProps {
  initialData: {
    titulo: string;
  };
  cursoId: number;
  unidadId: number;
}

const formSchema = z.object({
  titulo: z
    .string()
    .min(5, "El nombre de la unidad debe de tener minimo 5 caracteres")
    .max(80, "El nombre de la unidad debe de tener maximo 80 caracteres")
    .regex(
      /^[A-Za-z0-9][A-Za-z0-9\s]+$/i,
      "Nombre de la unidad invalido, solo se aceptan letras y numeros"
    ),
});

const ChapterTitleForm: FC<ChapterTitleFormProps> = ({
  cursoId,
  unidadId,
  initialData,
}) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/curso/${cursoId}/unidad/${unidadId}`, values);
      toast.success("Nombre de unidad actualizado");
      toggleEdit();
      router.refresh();
    } catch (error) {
      if (error.response.data === "unidad_ya_creado") {
        toast.error("Ya has creado una unidad con este nombre");
      } else {
        toast.error("Algo salio mal, intentalo mas tarde");
      }
    }
  };

  return (
    <div className="p-4 mt-6 border rounded-md bg-slate-100">
      <div className="flex items-center justify-between font-medium">
        Titulo de la unidad
        <Button variant="ghost" type="button" onClick={toggleEdit}>
          {isEditing ? (
            "Cancelar"
          ) : (
            <>
              <Pencil className="w-4 h-4 mr-2" />
              Editar
            </>
          )}
        </Button>
      </div>
      {isEditing ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 space-y-4"
          >
            <FormField
              control={form.control}
              name="titulo"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Introduccion al curso'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={isSubmitting} type="submit">
                Guardar
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <p className="mt-2 text-sm">{initialData.titulo}</p>
      )}
    </div>
  );
};

export { ChapterTitleForm };
