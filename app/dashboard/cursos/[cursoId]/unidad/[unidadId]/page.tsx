import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import getUnidadById from "@/app/actions/getUnidadById";

import { ChapterTitleForm } from "./components/unidadTituloForm";
import { ChapterDescriptionForm } from "./components/unidadDescripcionForm";
import { ArchivosForm } from "./components/unidadArchivosForm";

interface IParams {
  cursoId: number;
  unidadId: number;
}

const ChapterIdPage = async ({ params }: { params: IParams }) => {
  const unidad = await getUnidadById(params.unidadId, params.cursoId);

  return (
    <>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/dashboard/cursos/registrar/${params.cursoId}`}
              className="flex items-center mb-6 text-sm transition hover:opacity-75"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Volver al curso
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">
                  Personalizacion de la unidad
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div 
        className='grid grid-cols-2 '>
          <ChapterTitleForm
            unidadId={params.unidadId}
            cursoId={params.cursoId}
            initialData={unidad}
          />

          <ArchivosForm initialData={unidad} unidadId={params.unidadId} />

          <ChapterDescriptionForm
            initialData={unidad}
            cursoId={params.cursoId}
            unidadId={params.unidadId}
          />
        </div>
      </div>
    </>
  );
};

export default ChapterIdPage;
