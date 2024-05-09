"use client";

import Button from "@/app/components/Button";
import { useCallback, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useForm, SubmitHandler, set } from "react-hook-form";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type Variant = "LOGIN" | "REGISTER";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { signIn, useSession } from "next-auth/react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const formSchema = z.object({
  user: z
    .string()
    .min(5, "El usario debe tener un minimo de 5 caracteres")
    .max(25, "El usario debe tener un maximo de 25 caracteres")
    .regex(
      /^[a-zA-Z0-9][a-zA-Z0-9\s]*$/i,
      "El usuario solo puede contenter letras o numeros"
    )
    .optional()
    .or(z.literal("")),
  name: z
    .string()
    .min(5, "El usario debe tener un minimo de 5 caracteres")
    .max(70, "El usario debe tener un maximo de 70 caracteres")
    .regex(
      /^[a-zA-Z][a-zA-Z\s]*$/i,
      "El usuario solo puede contenter letras"
    )
    .optional()
    .or(z.literal("")),
  email: z.string().email("Email invalido"),
  password: z
    .string()
    .min(6, "La contraseña debe de tener una longitud minima de 6")
    .max(170, "La contraseña debe de tener una longitud maxima de 170")
    .optional()
    .or(z.literal("")),
  rolId: z.number().default(1),
});

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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rolId: 1,
      user: "",
    },
  });

  const SubmitHandler = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      axios
        .post("/api/register", { ...values, user: "default", rolId: 1 })
        .then(() => {
          signIn("credentials", values);
          toast.success("Registrado correctamente")
        })
        .catch((error) => {
          if (error.response.data === "User_email_key") {
            toast.error("El correo ya existe");
          } else if (error.response.data == "Missing info") {
            toast.error("Completa el formulario :p");
          }
          else {
            toast.error("Ocurrio un error, intentalo mas tarde");
          }
        })
        .finally(() => setIsLoading(false));
    }

    if (variant === "LOGIN") {
      signIn("credentials", {
        ...values,
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
    setChecked(!checked)
    setTypeInput(checked ? "password"  : "text")
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className=" px-4 py-8  sm:px-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(SubmitHandler)}
            className="space-y-8"
          >
            {variant === "REGISTER" && (
              <>
                <FormField
                  control={form.control}
                  name="user"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Nombre de usuario" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Nombre completo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Correo electronico" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-row items-center space-x-5">
                      <Input placeholder="Contraseña" type={typeInput} {...field} />
                      {
                        checked
                          ? (<EyeIcon onClick={() => handleInput()} width={35} height={35} />)
                          : (<EyeSlashIcon onClick={() => handleInput()} width={35} height={35} />)
                      }

                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />



            <Button disabled={isLoading} fullWidth type="submit">
              {variant === "LOGIN" ? "Iniciar sesion" : "Registrarse"}
            </Button>
          </form>
        </Form>
        <div className=" flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
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
