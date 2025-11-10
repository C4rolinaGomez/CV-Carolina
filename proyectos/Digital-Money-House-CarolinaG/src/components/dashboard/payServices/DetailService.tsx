"use client";
import { useSelectService } from "@/context/moneyContext";
import { getServiceId } from "@/services/services.service";
import { ServiceType } from "@/types/service.types";
import Link from "next/link";
import { useEffect, useState } from "react";

const DetailService = () => {
  const { serviceId } = useSelectService();
  const [service, setService] = useState<ServiceType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const data = await getServiceId(serviceId);
        setService(data);
      } catch (err) {
        setError("No se pudo cargar el servicio.");
        console.error(err);
      }  finally {
        setLoading(false);
      }
    };
    if (serviceId) {
      fetchService();
    }
  }, [serviceId]);

  if (loading) {
    return (
      <section className="w-full bg-dark1 px-5 pt-5 pb-10 md:px-8 xl:px-12 gap-5 md:gap-10 rounded-[8px] animate-pulse">
        <div className="w-full h-4 bg-gray-700 rounded mb-4"></div>
        <div className="w-1/2 h-6 bg-gray-600 rounded mb-3"></div>
        <div className="w-full h-10 bg-gray-700 rounded"></div>
      </section>
    );
  }

  
  if (error || !service) {
    return (
      <p className="text-red-500 font-bold text-center py-4">{error}</p>
    );
  }


  const amount = service?.invoice_value || 0.0;
  const formattedSaldo = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(amount);

  return (
    <section className="w-full flex flex-col gap-3 bg-dark1 p-5 md:px-10 md:py-8 md:gap-6 xl:px-12  justify-between rounded-[8px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
      <div className="px-2 flex flex-col md:flex-row-reverse md:justify-between md:items-center">
        <div className="w-full flex justify-end ">
          <Link
            href=""
            className="font-semibold text-xs md:text-base underline decoration-1 hover:decoration-2"
          >
            Ver detalles del pago
          </Link>
        </div>
        <h3 className="w-full text-green text-xl md:text-2xl font-bold pt-2 md:pt-0">
          {service?.name}{" "}
        </h3>
      </div>

      <div className="w-full border-b border-button1/80"></div>

      <div className="w-full px-2 flex flex-row justify-between ">
        <span className="font-bold md:text-2xl ">Total a pagar</span>
        <span className="font-bold md:text-2xl">
          {service?.invoice_value && formattedSaldo}
        </span>
      </div>
    </section>
  );
};

export default DetailService;
