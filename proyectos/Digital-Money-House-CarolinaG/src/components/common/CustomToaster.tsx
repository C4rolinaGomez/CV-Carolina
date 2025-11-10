"use client";
import { Toaster } from "sonner";


const CustomToaster = () => {
  return (
    <Toaster
      position="bottom-right"
      richColors={false}
      toastOptions={{
        duration: 4000,

        className:
          "text-dark1 bg-white border border-dark1 rounded-[10px] !px-5 !py-3 text-sm md:text-base font-semibold shadow-[0_4px_4px_rgba(0,0,0,0.1)] !w-fit",

        classNames: {
          success: "!bg-green !text-dark1 !text-sm !md:text-base !font-semibold !border !border-dark1 !shadow-[0_4px_4px_rgba(0,0,0,0.1)] !w-fit",
          error: "!bg-error1 !text-white !text-sm !md:text-base !font-semibold !border !border-error1 !shadow-[0_4px_4px_rgba(0,0,0,0.1)] !w-fit",
          loading: "!bg-gray1 !text-dark1 !text-sm !md:text-base !font-semibold !border !border-gray1 !shadow-[0_4px_4px_rgba(0,0,0,0.1)] !w-fit",
        },
      }}
    />
  );
};

export default CustomToaster;



