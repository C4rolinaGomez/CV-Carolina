import { FieldError, FieldErrorsImpl, FieldValues, Merge, useFormContext } from "react-hook-form";
import { clsx } from "clsx";

/**
 * Componente TextInput para entradas de formulario.
 * @type {React.FC<TextInputProps & React.InputHTMLAttributes<HTMLInputElement>>}
 */
interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  fieldName: string;
  placeholder?: string;
  errorText?: string | FieldError | Merge<FieldError, FieldErrorsImpl<FieldValues>> | undefined;
  inputClassName?: string;
  value?: string | readonly string[] | number | undefined;
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
}

const InputText = ({
  fieldName,
  type = "text",
  placeholder,
  errorText,
  value,
  inputClassName,
  ...props
}: InputTextProps) => {
  const { register, formState: { errors } } = useFormContext();
  const hasError = !!errors[fieldName];

  return (
    <div className="w-full">
      <input
        {...register(fieldName)}
        type={type}
        value={value}
        placeholder={placeholder}
        {...props}
        className={clsx(
          "w-full h-[50px] md:h-[64px] p-3 md:p-5 text-base md:text-[18px] bg-white text-dark1 rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.10)] outline-none outline-offset-1 transition-all ",
          hasError 
            ? "border border-error1 focus:outline-error1"
            : "border border-gray1 focus:outline-gray1 ",
          inputClassName
        )}
      />
      {hasError && (
        <p className="w-full h-[12px] max-w-[300px] md:max-w-[360px] flex flex-col text-sm italic text-error1 pt-1.5 pl-3 md:pt-2 text-left">
          {errorText as string}
        </p>
      )}
    </div>
  );
};

export default InputText;
