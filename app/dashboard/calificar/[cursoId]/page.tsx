"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface IParams {
  cursoId: number;
}
const Calificar = ({ params }: { params: IParams }) => {
    const router = useRouter();
  const [value, setValue] = useState({
    calificacion1: 0,
    calificacion2: 0,
    calificacion3: 0,
  });
  const handleSumbit = () => {
    axios
      .patch(`/api/curso/calificar/${params.cursoId}`, value)
      .then(() => {
        toast.success("Gracias")
      })
      .catch(() => {
        toast.error("Ocurrio un error, intentalo mas tarde")
      }).finally(()=>{
        router.replace('/dashboard')
      })
  };

  const handleRate = (event: any, newValue: number) => {
    setValue({...value, [event.target.name]:newValue})
  };

  return (
    <div className="text-center">
      <p className="text-2xl font-semibold">Evaluacion del curso</p>
      <Box
        sx={{
          "& > legend": { mt: 2 },
        }}
      >
        
        <Typography component="legend">Calidad del material</Typography>

        <Rating
          name="calificacion1"
          value={value.calificacion1}
          size="large"
          onChange={(event, newValue) => handleRate(event, newValue)}
        />
        <Typography component="legend">Recomendacion del curso</Typography>
        <Rating
          name="calificacion2"
          value={value.calificacion2}
          size="large"
          onChange={(event, newValue) => handleRate(event, newValue)}
        />
        <Typography component="legend">Opinion final del curso</Typography>
        <Rating
          name="calificacion3"
          value={value.calificacion3}
          size="large"
          onChange={(event, newValue) => handleRate(event, newValue)}
        />
      </Box>
      <Button
        className="mt-5 bg-[#7A4EFF] hover:bg-[#7A4EFF]"
        onClick={() => handleSumbit()}
      >
        Enviar
      </Button>
    </div>
  );
};
export default Calificar;
