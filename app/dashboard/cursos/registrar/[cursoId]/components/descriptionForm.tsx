"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Curso } from "@prisma/client";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";

import * as z from "zod";

// import { Loading } from '@/components/loading';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface DescriptionFormProps {
  initialData: Curso;
  courseId: number;
}

const formSchema = z.object({
  descripcion: z
    .string()
    .min(5, "La descripcion debe de tener minimo 5 caracteres")
    .max(190, "La descripcion debe de tener maximo 190 caracteres"),
});

const DescriptionForm: FC<DescriptionFormProps> = ({
  courseId,
  initialData,
}) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      descripcion: initialData.descripcion || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/curso/${courseId}`, values);
      toast.success("Descripcion actualizada");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Algo ocurrio, intentalo mas tarde");
    }
  };

  return (
    <div className="p-4 mt-6 border rounded-md bg-slate-100">
      <div className="flex items-center justify-between font-medium">
        Descripcion del curso
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
              name="descripcion"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="e.g. 'Este curso es sobre...'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={ isSubmitting} type="submit">
                Guardar
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <p
          className={cn(
            "text-sm mt-2",
            !initialData.descripcion && "text-slate-500 italic"
          )}
        >
          {initialData.descripcion || "No description"}
        </p>
      )}
    </div>
  );
};

export { DescriptionForm };
