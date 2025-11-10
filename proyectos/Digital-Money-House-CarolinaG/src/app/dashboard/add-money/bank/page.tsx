import AliasAndCvu from '@/components/dashboard/profile/AliasAndCvu'
import { getAccount } from '@/services/account.service';
import { getTokenFromCookie } from '@/utils/getTokenFromCookie';
import React from 'react'

const AddMoneyBankPage = async () => {

  const token =await getTokenFromCookie();
  const accountData = await getAccount(token);
 
  return (
    
       <AliasAndCvu 
       accountData={accountData} />
  )
}

export default AddMoneyBankPage