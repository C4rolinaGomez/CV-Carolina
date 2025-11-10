import ErrorMessage from '@/components/common/ErrorMessage';
import AddCard from '@/components/dashboard/cards/AddCard'
import { getAccount } from '@/services/account.service';
import { getAllCards } from '@/services/cards.service';
import { getTokenFromCookie } from '@/utils/getTokenFromCookie';
import React from 'react'

const NewCardPage =  async () => {
 
  const token = await getTokenFromCookie();
  const accountData = await getAccount(token);
  const cardsList = await getAllCards(accountData.id, token);

   // Valida si ya tiene 10 tarjetas
   if (cardsList.length >= 10) {
    return (
      
        <ErrorMessage
          operationType="limitCards"
       //   linkTo="/dashboard/cards"
           />
      
    );
  }

  return (
    <div className='xl:p-5'>
      <AddCard
      account_id={accountData.id}
      token = {token}
      />
    </div>
  )
}

export default NewCardPage