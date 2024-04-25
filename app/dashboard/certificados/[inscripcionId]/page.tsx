import React from "react";

const Certificado = () => {
  return (
    <div className="space-y-10 mt-20">
      <div className="text-center">
        <span className="border-2 border-black rounded-full px-5 py-3 text-3xl">
          RECONOCIMIENTO
        </span>
      </div>

      <div className="grid grid-rows-3 gap-4 mx-20 px-14 pt-10 border-4 rounded-3xl text-2xl border-[#794CFF] ">
        <div className="text-center">
          <p className="text-2xl">Se le otorga el presente certificado a:</p>
          <p className="font-bold">NOMBRE DEL ALUMNO</p>
        </div>
        <div className="">
          Por concluir stisfactoriamente el curso de:{" "}
          <u className="font-bold">NOMBRE DEL CURSO</u>. con el profesor:{" "}
          <u className="font-bold">NOMBRE DEL PROFESOR</u>. Esperamos haya sido
          de su agrado y pueda realizar mas estudios con nosotros
        </div>
        <div className="text-end place-items-end mt-1">
          <div>
            ----------------------
            <p>FIRMA</p>
            <p>Lic. Patricio Rodriguez</p>
            <p>Director general de educaconecta</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificado;
