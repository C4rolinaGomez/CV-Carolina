import ArrowIcon from "@/components/common/Icons/ArrowIcon";
import PlusIcon from "@/components/common/Icons/PlusIcon";
import UserCards from "@/components/dashboard/cards/UserCards";
import { getAccount } from "@/services/account.service";
import { getAllCards } from "@/services/cards.service";
import { getTokenFromCookie } from "@/utils/getTokenFromCookie";
import Link from "next/link";

export default async function CardsPage() {
  const token = await getTokenFromCookie();
  const accountData = await getAccount(token);
  const accountId = accountData.id;
  const cardsList = await getAllCards(accountId, token);

  // TRUE cuando esta en true se muestran todas las tarjetas con un select.
  // FALSE cuando esta en false se muestran todas las tarjetas con un delete.
  const showAddMoneyPage = false;

  return (
    <>
      <div className="w-full flex flex-col gap-5 ">
        <section className="w-full flex flex-col bg-dark1  px-6 py-4 gap-7 min-h-[147px] md:justify-center md:px-8 md:py-10 xl:px-12 rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
          <h3 className="text-gray1 md:hidden xl:block font-bold ">
            Agregá tu tarjeta de débito o crédito
          </h3>

          <Link
            href={"/dashboard/cards/new-card"}
            className="w-full flex flex-row justify-between items-center"
          >
            <div className="flex flex-row gap-5 items-center">
              <span className="flex justify-center items-center">
                <PlusIcon className="w-[34px] h-[34px]" />
              </span>
              <p className="text-xl text-green text-start font-bold ">
                Nueva tarjeta
              </p>
            </div>
            <span className="flex justify-end items-center">
              <ArrowIcon className="w-[18px] h-[18px] fill-green" />
            </span>
          </Link>
        </section>

        
          <UserCards
            accountId={accountId}
            cardsList={cardsList}
            showAddMoneyPage={showAddMoneyPage}
            token= {token}
          />
        
      </div>
    </>
  );
}
