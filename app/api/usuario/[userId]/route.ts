import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  userId: number;
}

export async function PATCH(request: Request, { params }: { params: IParams }) {
  try {
    const body = await request.json();
    const { userId } = params;

    const updateUser = await prisma.user.update({
      where: {
        id: parseInt(userId),
      },
      data:{
        ...body
      }
    });

    return NextResponse.json(updateUser);
  } catch (error: any) {
    console.log(error, "REGISTRATION_ERROR");
    return new NextResponse("Internal error", { status: 500 });
  }
}
