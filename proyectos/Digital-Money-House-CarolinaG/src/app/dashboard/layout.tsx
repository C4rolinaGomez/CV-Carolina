import Breadcrumb from "@/components/dashboard/layout/Breadcrumb";
import Sidebar from "@/components/dashboard/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import { getAccount } from "@/services/account.service";
import { getUser } from "@/services/user.service";
import { capitalize } from "@/utils/capitalize";
import { getTokenFromCookie } from "@/utils/getTokenFromCookie";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const token = await getTokenFromCookie();
  const accountData = await getAccount(token);
  const userId = accountData.user_id;
  const userData = await getUser(token, userId);


  return (
    <>
      <Navbar
        logoLink="/"
        logoClassName="fill-green"
        isLogged
        userName={`${capitalize(userData.firstname)} ${capitalize(userData.lastname)}`}
        userData={userData}
      />


      <main className="w-full p-5 flex flex-col grow md:flex-row bg-gray1 md:p-0 xl:p-0">
        <aside className="hidden md:bg-green md:block md:w-2/5 xl:w-1/5 ">
          <Sidebar></Sidebar>
        </aside>

        <div className=" w-full gap-5 md:p-12 xl:px-20 xl:py-10 flex-col flex">
          <div className="w-full flex md:hidden">
            <Breadcrumb />
          </div>
          {children}
        </div>
      </main>
    </>
  );
}
