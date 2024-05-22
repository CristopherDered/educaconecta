import React, { useState } from "react";
import Carta from "./components/Carta";
import getCursosInscritos from "../actions/getCursosInscritos";
import getInfoEscuela from "../actions/getInfoEscuela";

const Dashboard = async () => {
  const cursos = await getCursosInscritos();
  const infoEscuela = await getInfoEscuela()
  console.log('-------------------------------')
  console.log(cursos)
  console.log('-------------------------------')
  return (  
      <div className=" mt-5">
        <Carta inscripciones={cursos} infoEscuela={infoEscuela}/>
      </div>
    
  );
};

export default Dashboard;
