"use client";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const UserMenu = () => {
  const router = useRouter();
  const session = useSession();

  

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={toggleOpen}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          {session?.data?.user?.name}
        </div>
        <div className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 rounded-full flex flex-row items-center gap-3 cursor-pointer hover:shadow-md transition"></div>
        {isOpen && (
          <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
            <div className="flex flex-col cursor-pointer">
              <>
                <MenuItem
                  onClick={() => {
                    signOut();
                    router.push('/')
                  }}
                  label="Salir"
                />
              </>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMenu;
