import React from "react";
import Link from "../../../../node_modules/next/link";

type LogoLetrasProps = {
  href: string | "/";
};

const LogoLetras = ({href }: LogoLetrasProps) => {
  return (
    <Link href={href} className="flex items-center justify-center">
      <div className="w-[344px] h-[38px] relative">
        <div data-svg-wrapper className="left-0 top-0 absolute">
          <svg
            width="121"
            height="38"
            viewBox="0 0 121 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 10C0 4.47715 4.47715 0 10 0H121V38H10C4.47715 38 0 33.5228 0 28V10Z"
              fill="#C1FD35"
            />
          </svg>
        </div>
        <div data-svg-wrapper className="left-[344px] top-[38px] absolute">
          <svg
            width="223"
            height="38"
            viewBox="0 0 223 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M223 28C223 33.5228 218.523 38 213 38L0 38L3.32206e-06 -4.21793e-07L213 1.81993e-05C218.523 1.86821e-05 223 4.47717 223 10L223 28Z"
              fill="#201F22"
            />
          </svg>
        </div>
        <div className="w-[113px] left-[7px] top-[3px] absolute text-[#201f22] text-3xl font-extrabold font-['Roboto'] leading-[34.11px]">
          DIGITAL{" "}
        </div>
        <div className="w-[216px] left-[127px] top-[3px] absolute text-white text-3xl font-medium font-['Roboto'] leading-[34.11px]">
          MONEY HOUSE
        </div>
      </div>
    </Link>
  );
};

export default LogoLetras;
