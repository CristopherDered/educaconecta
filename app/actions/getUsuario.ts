import prisma from "@/app/libs/prismadb";
import bcrypt from "bcrypt";

const getUsuario = async (email: string, password: string) => {
  try {

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    console.log(user)

    return user;
  } catch (error: any) {
    console.log(error);
    return [];
  }
};

export default getUsuario;
