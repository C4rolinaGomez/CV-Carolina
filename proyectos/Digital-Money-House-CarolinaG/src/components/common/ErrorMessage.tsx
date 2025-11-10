"use client";
import ErrorIcon from "@/components/common/Icons/ErrorIcon";
import { errorContent } from "@/data/errorContent";
import { useRouter } from "next/navigation";

type OperationType = "limitCards" | "accountService" | "payService";

type ErrorMessageProps = {
  operationType: OperationType;
 // linkTo?: string;
};

const ErrorMessage = ({
  operationType,
 // linkTo,
}: ErrorMessageProps) => {
  const { title, description, button } = errorContent[operationType];
  const router = useRouter();

  const handleClick = () => {
        router.back(); 
  };

  return (
    <section className="flex flex-col gap-5">
      <div className="bg-dark1 rounded-[8px] p-7 md:px-12 md:py-10 flex flex-col gap-4 md:gap-5 items-center">
        <div className="flex items-center justify-center">
          <ErrorIcon className="w-[41px] h-[41px] md:w-[65px] md:h-[65px] " />
        </div>

        <h1 className="font-bold text-xl text-center md:flex md:justify-center md:text-2xl ">
          {title}
        </h1>

        <div className="w-full border-b border-button1/50 md:my-2 xl:my-0" />

        <p className="text-button1/70 text-xs text-center md:flex md:flex-col md:justify-center md:items-center md:text-base md:px-5 xl:px-10 xl:w-2/4">
          {description}{" "}
        </p>
      </div>
{/* 
      <div className="w-full h-[50px] md:h-[64px] flex justify-end ">
        {linkTo ? (
          <Link
            href={linkTo}
            className="w-[165px] h-[50px] md:h-[64px] bg-green text-dark1 rounded-[10px] font-bold flex
            items-center transition outline-none focus:outline-2 focus:outline-dark1 justify-center shadow-[0_4px_4px_rgba(0,0,0,0.10)] md:w-full xl:w-[233px]"
          >
            {button}
          </Link>
        )}
      </div> */}
      <div className="w-full h-[50px] md:h-[64px] flex justify-end">
        <button
          onClick={handleClick}
          className="w-[165px] h-[50px] md:h-[64px] bg-green text-dark1 rounded-[10px] font-bold flex items-center justify-center transition outline-none focus:outline-2 focus:outline-dark1 shadow-[0_4px_4px_rgba(0,0,0,0.10)] md:w-full xl:w-[233px]"
        >
          {button}
        </button>
      </div>
    </section>
  );
};

export default ErrorMessage;


