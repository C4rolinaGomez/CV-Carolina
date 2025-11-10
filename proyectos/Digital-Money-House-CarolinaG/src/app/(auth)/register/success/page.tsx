import RegisterSuccess from '@/components/auth/register/RegisterSuccess';
import Navbar from '@/components/layout/Navbar'
import React from 'react'

const RegisterSuccessPage = () => {
  return (
    <>
      <Navbar
        logoLink="/"
        logoClassName="fill-dark1"
        navbarClassName="bg-green"
      />
      <main className="w-full flex p-10 flex-col gap-8 items-center justify-center relative grow ">

        <RegisterSuccess />
      </main>
    </>
  )
}

export default RegisterSuccessPage;