import ServicesList from "@/components/dashboard/payServices/ServicesList";
import { getAllServices } from "@/services/services.service";

const PayServicesPage = async () => {

  const servicesList = await getAllServices();
  const showServicePage = true;

  return (
    <div className='h-full'>
      <ServicesList
      servicesList= {servicesList}
      showServicePage= {showServicePage}
      />
    </div>
  )
}

export default PayServicesPage