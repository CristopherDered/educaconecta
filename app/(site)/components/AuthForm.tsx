"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import { useCallback, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useForm, SubmitHandler, set } from "react-hook-form";

import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { signIn, useSession } from "next-auth/react";

type Variant = "LOGIN" | "REGISTER";

interface FieldValues {
  user: "";
  name: "";
  email: "";
  password: "";
  rolId: 1;
}

export default function AuthForm() {
  const session = useSession();
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
    if (session?.status === "authenticated") {
      router.push("/dashboard");
    }
  }, [session?.status, router]);

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
        .post("/api/register", { ...data, user: "default", "rolId": 1 })
        .then(() => {
          signIn("credentials", data);
        })
        .catch((error) => {
          if (error.response.data === 'User_email_key'){
            toast.error("El correo ya existe");
          } else{
            toast.error("Ocurrio un error, intentalo mas tarde");
          }
        })
        .finally(() => setIsLoading(false));
    }

    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          console.log(callback);
          if (callback?.error) {
            toast.error("Credenciales invalidas");
          }

          if (callback?.ok && !callback?.error) {
            toast.success("¡Bienvenido!");
            router.push("/dashboard");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const [typeInput, setTypeInput] = useState("text");
  const [checked, setChecked] = useState(true);

  const handleInput = () => {
    if (typeInput === "text") {
      setTypeInput("password");
      setChecked(false);
    } else {
      setTypeInput("text");
      setChecked(true);
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

          <div className=" flex flex-row items-center space-x-2">
            <Input
              id="password"
              label="Contraseña"
              register={register}
              required
              errors={errors}
              disabled={isLoading}
              type={typeInput}
            />

            <Checkbox checked={checked} onClick={() => handleInput()} />
          </div>

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
