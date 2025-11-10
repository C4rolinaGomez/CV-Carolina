"use client";
import SearchIcon from "@/components/common/Icons/SearchIcon";
import { useSelectService } from "@/context/moneyContext";
import { servicesData } from "@/data/services";
import { ServiceType } from "@/types/service.types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useServices from "@/hooks/useServices";
import CustomToaster from "@/components/common/CustomToaster";


type ServicesListProps = {
  servicesList: ServiceType[];
  showServicePage: boolean;
};

const ServicesList = ({ servicesList, showServicePage }: ServicesListProps) => {

  const { filteredServices, searchTerm, handleSearchChange } = useServices(
    servicesList,
  );
  const router = useRouter();
  const {setServiceId} = useSelectService();


  const handleSelectService = (service: ServiceType) => {
    setServiceId(service.id.toString());
    router.push(`/dashboard/pay-services/account`);
  };



  return (
    <>
    <CustomToaster />

      <section className="w-full flex flex-col items-center gap-5">
        {/* Buscador */}
        <div className="w-full h-[64px] flex items-center gap-5 p-5 md:px-8 md:gap-8 xl:px-12 bg-white border border-gray1 rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.1)]">
          <SearchIcon />
          <input
            className="text-black/50 text-base w-full outline-none md:text-[18px]"
            type="text"
            placeholder="Buscá entre más de 5.000 empresas "
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        {/* Listado de servicios */}
        <div className="w-full flex flex-col p-5 md:px-8 xl:px-12 xl:py-8  rounded-[10px] bg-white text-dark1 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.1)]">
          <h2 className="w-full text-base md:text-lg font-bold border-b border-dark1/30 pb-5">
            Mas recientes
          </h2>
          {filteredServices.length === 0 ? (
            <p className="text-gray-500 mt-4">
              No hay servicios disponibles en este momento, intente más tarde.
            </p>
          ) : (
            <>
              <ul className="w-full">
                {filteredServices.map((service, index) => (
                  <li
                    className="flex flex-row gap-3 md:gap-5  items-center justify-between border-b border-dark1/30 py-4"
                    key={`${service.id}-${index}`}
                  >
                    <div className="w-full items-start md:w-2/3 h-[25px] xl:w-1/4">
                      <Image
                        className="min-h-full max-h-full max-w-full  object-contain"
                        src={servicesData[service.id]?.src || ""}
                        width={70}
                        height={40}
                        alt={servicesData[service.id]?.alt || "Servicio"}
                      />
                    </div>
                    <h4 className="w-full  text-sm md:text-base  text-dark1">
                      {service.name}
                    </h4>

                    {showServicePage && (
                      <div className="w-full md:w-1/3 flex flex-col gap-0  items-end text-dark1">
                        <button onClick={() => handleSelectService(service)}>
                          <span className="text-sm font-bold md:text-base">
                            Seleccionar
                          </span>
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default ServicesList;
