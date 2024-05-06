"use client";

import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: any;
  errors: FieldErrors;
  disabled?: boolean;
  value?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  type,
  register,
  required,
  errors,
  disabled,
}) => {
  const validaciones = {
    required: required,
    min: 1,
    max: 190,
    pattern: /d+/i,
  };

  return (
    <div>
      {/* <label className="block text-sm font-medium leading-6 text-gray-900"
                htmlFor={id}>
                {label}
            </label> */}
      <input
        id={id}
        type={type}
        autoComplete={id}
        disabled={disabled}
        placeholder={label}
        {...register(id, {...validaciones})}
        className={clsx(
          `
                form-input 
                text-center
                block
                w-full
                rounded-full
                border-0
                py-5
                text-xl
                text-gray-900
                shadow-sm
                ring-1
                ring-inset
                ring-gray-300
                placeholder:text-gray-400
                focus:ring-2
                focus:ring-inset
                focus:ring-sky-600
                sm:text-sm
                sm:leading-6`,
          errors[id] && " focus:ring-rose-500 ",
          disabled && " opacity-50 cursor-default "
        )}
        />
        {errors[id]?.type === "required" && <p>Este campo es requerido</p>}
        {errors[id]?.type === "max" && <p>Excedes el numero de caracteres</p> }
        {errors[id]?.type === "min" && <p>No cumple con el tamaño minimo</p> }
        {errors[id]?.type === "pattern" && <p>Ehehehehe</p> }
        
    </div>
  );
};

export default Input;
