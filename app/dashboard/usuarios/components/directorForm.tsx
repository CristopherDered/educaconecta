"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Curso, Escuela } from "@prisma/client";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
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
import { Input } from "@/components/ui/input";

interface DirectorFormProps {
  initialData: Escuela;
}

const formSchema = z.object({
  director: z
    .string()
    .min(5, "El nombre debe tener un minimo de 5 caracteres")
    .max(70, "El nombre debe tener un maximo de 40 caracteres")
    .regex(/^[a-zA-Z][a-zA-Z\s]*$/i, "El nombre solo puede contener letras"),
});

const DirectorForm: FC<DirectorFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      director: initialData.director || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/escuela/${initialData.id || 1}`, values);
      toast.success("Nombre actualizado");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Algo ocurrio, intentalo mas tarde");
    }
  };

  return (
    <div className="p-4 my-6 border rounded-md bg-slate-100">
      <div className="flex items-center justify-between font-medium">
        Nombre del director general
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
              name="director"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="..."
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
        <p
          className={cn(
            "text-sm mt-2",
            !initialData.director && "text-slate-500 italic"
          )}
        >
          {initialData.director || "Nombre "}
        </p>
      )}
    </div>
  );
};

export { DirectorForm };
