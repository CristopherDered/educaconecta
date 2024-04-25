import React, { useState } from "react";
import Carta from "./components/Carta";
import getCursos from "../actions/getCursos";
import getCursosInscritos from "../actions/getCursosInscritos";

const Dashboard = async () => {
  const cursos = await getCursosInscritos();

  return (  
      <div className=" mt-5">
        <Carta cursos={cursos} />
      </div>
    
  );
};

export default Dashboard;
