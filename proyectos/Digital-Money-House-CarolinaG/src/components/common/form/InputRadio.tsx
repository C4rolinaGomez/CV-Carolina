import clsx from "clsx";

interface InputRadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  value: string;
  children?: React.ReactNode;
  disabled?: boolean;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputClassName?: string;
  wrappedClassName?: string;
}

const InputRadio = ({
  name,
  value,
  disabled,
  checked,
  onChange,
  inputClassName,
  wrappedClassName,
  ...props

}: InputRadioProps) => {
  return (
    <div className={clsx("flex items-center cursor-pointer", wrappedClassName)}>
      <input
        type="radio"
        name={name}
        value={value}
        disabled= {disabled}
        onChange={onChange}
        className={clsx(
          "w-4 h-4 border border-dark1 rounded-full appearance-none checked:bg-green checked:border-dark2 checked:after:bg-black checked:after:rounded-full checked:after:w-2 checked:after:h-2 relative cursor-pointer checked:after:block checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:transform checked:after:-translate-x-1/2 checked:after:-translate-y-1/2",
          inputClassName
        )}
        checked={checked}
        {...props}
      />
    </div>
  );
};

export default InputRadio; 