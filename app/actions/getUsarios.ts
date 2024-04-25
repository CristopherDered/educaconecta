import prisma from "@/app/libs/prismadb";


const getUsuarios = async () => {
  try {

    const usuarios = await prisma.user.findMany({
      include:{
        rol: true
      }
    });

    return usuarios;
  } catch (error: any) {
    console.log(error);
    return [];
  }
};

export default getUsuarios;
