import bcrypt from 'bcrypt'
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  userId: number;
}

export async function PATCH(request: Request, { params }: { params: IParams }) {
  try {
    const body = await request.json();
    const { userId } = params;
    const { user, name, email, rolId, password} = body

            
    if (!email || !name || !user || !rolId ) {
      return new NextResponse('Missing info', { status: 400 });
    }

    if (password){
      const hashedPassword = await bcrypt.hash(password, 12)
      let updateUser = await prisma.user.update({
        where: {
          id: parseInt(userId),
        },
        data:{
          user,
          name,
          email,
          hashedPassword,
          rolId: parseInt(rolId)
        }
      });
      return NextResponse.json(updateUser);
    }else{
      let updateUser = await prisma.user.update({
        where: {
          id: parseInt(userId),
        },
        data:{
          user,
          name,
          email,
          rolId: parseInt(rolId)
        }
      });
      return NextResponse.json(updateUser);
    }
  } catch (error: any) {
    console.log(error, "REGISTRATION_ERROR");
    return new NextResponse(error.meta.target, { status: 500 })
  }
}
