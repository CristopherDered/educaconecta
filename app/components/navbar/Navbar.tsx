import React, { useCallback, useState, useEffect } from "react";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import RegistrarCurso from "./nuevoCurso";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Roles from "./Roles";
import Usuarios from "./Usuarios";
import getCurrentUser from "@/app/actions/getCurrentUser";

const Navbar = async () => {
  const session = await getCurrentUser();

  // const router = useRouter();
  // useEffect(() => {
  //   if (session?.status === "unauthenticated") {
  //     router.push("/");
  //   }
  // }, [session?.status, router]);

  return (
    <div className="w-full bg-white z-10">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div
            className="
                        flex
                        flex-row
                        items-center
                        justify-between
                        gap-3
                        md:gap-0"
          >
            <Logo />

            <Search />

            
            {session?.rol.usuarios && <Usuarios />}

            {session?.rol.roles && <Roles />}

            {session?.rol.crearCurso && <RegistrarCurso />}            

            <UserMenu />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
