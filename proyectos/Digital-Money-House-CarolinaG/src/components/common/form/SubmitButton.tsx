import { clsx } from "clsx";

type SubmitButtonProps = {
  text: string;
  className?: string;
  isLoading?: boolean;
  onClick?: () => void;
};

const SubmitButton = ({
  text,
  className,
  isLoading = false,
  onClick,
}: SubmitButtonProps) => {
  return (
    <div className="w-full  ">
    
    <button
    type="submit"
      onClick={onClick}
      disabled= {isLoading}
      className={clsx(
        "w-full h-[50px] md:h-[64px] p-3 md:p-5 text-black text-base font-bold text-center rounded-[10px] transition outline-none shadow-[0px_4px_4px_0px_rgba(0,0,0,0.10)]",
        className
      )}
    >
          {isLoading ? (
            <span className="h-6 w-6 border-2 border-t-2 border-dark1 border-t-transparent rounded-full animate-spin inline-block"></span>
      ) : (
        text
      )}
    </button>
    </div>
  );
};

export default SubmitButton;
