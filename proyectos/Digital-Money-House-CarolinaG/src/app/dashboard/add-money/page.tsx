import ArrowIcon from '@/components/common/Icons/ArrowIcon'
import CardIcon from '@/components/common/Icons/CardIcon'
import UserIcon from '@/components/common/Icons/UserIcon'
import Link from 'next/link'
import React from 'react'

const AddMoneyPage = () => {


  
  return(
    <section className="flex flex-col gap-5">

       
            <Link href={"/dashboard/add-money/bank"}  
                className=" bg-dark1 shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex justify-between px-6 py-9 md:px-10 min-h-32 md:min-h-40 rounded-lg"
            >
                <div className="flex w-2/3 gap-5 md:gap-4 items-center">
                    <span className="justify-start">
                        <UserIcon/>
                    </span>
                    <p className="text-green1 flex font-bold text-xl justify-start text-start">
                      Transferencia bancaria
                    </p>
                </div>
                <span className="flex w-1/3 justify-end items-center">
                    <ArrowIcon className="w-[18px] h-[18px] fill-green"/>
                </span>
            </Link>

            <Link href={"/dashboard/add-money/card"}  
                className="bg-dark1 shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex justify-between px-6 py-9 md:px-10 min-h-32 md:min-h-40 rounded-lg"
                >
                <div className="flex w-2/3 gap-5  md:gap-4 items-center">
                    <span className="justify-start">
                        <CardIcon/>
                    </span>
                    <p className="text-green1 flex font-bold text-xl justify-start text-start">
                      Seleccionar tarjeta
                    </p>
                </div>
                <span className="flex w-1/3 justify-end items-center">
                    <ArrowIcon className="w-[18px] h-[18px] fill-green"/>
                </span>
            </Link>
     

    </section>
)
}

export default AddMoneyPage