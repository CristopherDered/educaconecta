"use client";

import { Archivos, Unidades } from "@prisma/client";
import axios from "axios";
import { File, ImageIcon, Loader2, PlusCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { toast } from "sonner";
import * as z from "zod";

import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";

interface ArchivosFormProps {
  initialData: Unidades & {
    Archivos: Archivos[];
  };
  unidadId: number;
}

const formSchema = z.object({
  url: z.string().min(1),
});

const ArchivosForm: FC<ArchivosFormProps> = ({ unidadId, initialData }) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/unidad/${unidadId}/archivos`, values);
      toast.success("Archivo adjunto subido");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Algo ocurrio, intentalo mas tarde");
    }
  };

  const onDelete = async (id: number) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/unidad/${unidadId}/archivos/${id}`);
      toast.success("Archivo adjunto eliminado");
      router.refresh();
    } catch {
      toast.error("Algo ocurrio, intentalo mas tarde");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-4 mt-6 ml-6 border rounded-md bg-slate-100">
      <div className="flex items-center justify-between font-medium">
        Archivos de unidad
        <Button variant="ghost" type="button" onClick={toggleEdit}>
          {isEditing ? (
            "Cancelar"
          ) : (
            <>
              <PlusCircle className="w-4 h-4 mr-2" />
              Añadir un archivo
            </>
          )}
        </Button>
      </div>
      {isEditing ? (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url });
              }
            }}
          />
          <div className="mt-4 text-xs text-muted-foreground">
            Añade un archivo a tu curso, El archivo estara disponible para
            descargar
          </div>
        </div>
      ) : !initialData.Archivos ? (
        <div className="flex items-center justify-center rounded-md h-60 bg-slate-200">
          <ImageIcon className="w-10 h-10 text-slate-500" />
        </div>
      ) : (
        <>
          {initialData.Archivos.length === 0 ? (
            <p className="mt-2 text-sm italic text-slate-400">
              Sin archivos aún
            </p>
          ) : (
            <div className="space-y-3">
              {initialData.Archivos.map((adjunto) => (
                <div
                  key={adjunto.id}
                  className="flex items-center w-full p-3 border rounded-sm border-sky-200 text-sky-700"
                >
                  <File className="flex-shrink-0 w-4 h-4 mr-2" />
                  <p className="text-xs line-clamp-1">{adjunto.titulo}</p>
                  <div className="flex items-center pr-2 ml-auto gap-x-2">

                  {deletingId === adjunto.id ? (
                    <div>
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </div>
                  ) : (
                      <button
                        onClick={() => onDelete(adjunto.id)}
                        className="ml-auto transition hover:opacity-75"
                      >
                        <X className="w-4 h-4" />
                      </button>
                  )}

                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export { ArchivosForm };
