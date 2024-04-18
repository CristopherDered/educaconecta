"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import { useCallback, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useForm, SubmitHandler, set } from "react-hook-form";
import { json } from "stream/consumers";
import getSession from "@/app/actions/getSession";
import getUsuario from "@/app/actions/getUsuario";
import prisma from "@/app/libs/prismadb";
import bcrypt from "bcrypt";
import { toast } from "sonner";

type Variant = "LOGIN" | "REGISTER";

interface FieldValues {
  user: "";
  name: "";
  email: "";
  password: "";
  rolId: 1;
}

export default function AuthForm() {
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  useEffect(() => {
    if (getSession()) {
      router.push("/dashboard");
    }
  }, [router]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      axios
        .post("/api/register", { ...data, user: "default" })
        .then((newUser) => {
          localStorage.setItem("session", JSON.stringify(newUser.data));
        })
        .catch(() => {})
        .finally(() => setIsLoading(false));
    }

    if (variant === "LOGIN") {
      axios
        .post("/api/usuario", data)
        .then((user) => {
          localStorage.setItem("session", JSON.stringify(user.data));
        })
        .catch((error) => {
          toast("Datos incorrectos");
        })
        .finally(() => {        
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className=" px-4 py-8  sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              id="name"
              label="Nombre"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
          )}

          <Input
            id="email"
            label="Email"
            register={register}
            required
            errors={errors}
            disabled={isLoading}
          />

          <Input
            id="password"
            label="Contraseña"
            register={register}
            required
            errors={errors}
            disabled={isLoading}
          />

          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {variant === "LOGIN" ? "Iniciar sesion" : "Registrarse"}
            </Button>
          </div>
        </form>

        <div
          className="
                flex
                gap-2
                justify-center
                text-sm
                mt-6
                px-2
                text-gray-500
                "
        >
          <div>
            {variant === "LOGIN"
              ? "Nuevo en educaconecta?"
              : "Ya tienes una cuenta?"}
          </div>

          <div onClick={toggleVariant} className="underline cursor-pointer">
            {variant === "LOGIN" ? "Crea un cuenta" : "Inicia sesion"}
          </div>
        </div>
      </div>
    </div>
  );
}
