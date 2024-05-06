"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Unidades } from "@prisma/client";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from 'sonner';
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

interface ChapterDescriptionFormProps {
  initialData: Unidades;
  cursoId: number;
  unidadId: number;
}

const formSchema = z.object({
  contenido: z
  .string()
  .min(5, "La descripcion debe de tener minimo 5 caracteres")
  .max(190, "La descripcion debe de tener maximo 190 caracteres"),
});

const ChapterDescriptionForm: FC<ChapterDescriptionFormProps> = ({
  cursoId,
  initialData,
  unidadId,
}) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contenido: initialData.contenido || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/curso/${cursoId}/unidad/${unidadId}`, values);
      toast.success("Unidad de unidad actualizada");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Algo ocurrio mal, intentalo mas tarde");
    }
  };

  return (
    <div className="p-4 mt-6 border rounded-md bg-slate-100">
      <div className="flex items-center justify-between font-medium">
        Descripcion de la unidad
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
              name="contenido"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="e.g. 'Este es un curso de...'"
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
        <p>{initialData.contenido}</p>
      )}
    </div>
  );
};

export { ChapterDescriptionForm };
