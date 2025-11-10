import CheckIcon from '@/components/common/Icons/CheckIcon'
import React from 'react'
import Link from '../../../../node_modules/next/link'

const RegisterSuccess = () => {
  return (
    <>
    <main className="w-full flex flex-col items-center gap-6 md:gap-16">
    <div className="flex flex-col gap-7 items-center w-80 md:w-full max-w-xl">
      <h1 className="text-4xl md:text-[64px] font-semibold md:leading-[90px]">Registro Exitoso</h1>
      <CheckIcon className="fill-green w-[92px] h-[95px]" />
      <p className="text-sm px-8 md:text-base text-center md:px-12">
        Hemos enviado un correo de confirmación para validar tu email, por
        favor revisalo para iniciar sesión.
      </p>
    </div>
    <Link
      href="/login"
      className="w-full text-base p-3 bg-green md:p-5 focus:outline-2 focus:outline-black rounded-[10px] font-bold text-center text-black w-72 md:w-[360px]"
    >
      Continuar
    </Link>

  </main>
  </>
  )
}

export default RegisterSuccess