"use client";

import { Archivos, Escuela, Unidades } from "@prisma/client";
import axios from "axios";
import { File, ImageIcon, Loader2, PlusCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { toast } from "sonner";
import * as z from "zod";

import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import Image from 'next/image'

interface AdjuntoFormsProps {
    initialData: Escuela
}
const formSchema = z.object({
  url: z.string().min(1),
});

const AdjuntoForms: FC<AdjuntoFormsProps> = ({ initialData }) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/escuela/${1}`, values);
      toast.success("Firma cambiada");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Algo ocurrio, intentalo mas tarde");
    }
  };

  const onDelete = async (id: number) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/escuela/${1}`);
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
        Cambiar firma
        <Button variant="ghost" type="button" onClick={toggleEdit}>
          {isEditing ? (
            "Cancelar"
          ) : (
            <>
              <PlusCircle className="w-4 h-4 mr-2" />
              Editar
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
            Añade la imagen de una firma
          </div>
        </div>
      ) : (
        <div className="">
            <img src={initialData.url}  width={100} height={50}/>
        </div>
      )}
    </div>
  );
};

export default AdjuntoForms ;
