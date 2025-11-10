// import ActivityDetail from '@/components/dashboard/activity/ActivityDetail';
// import { getAccount } from '@/services/account.service';
// import { getTokenFromCookie } from '@/utils/getTokenFromCookie';

// const ActivityDetailPage = async () => {
//   const token = getTokenFromCookie();
//   const accountData = await getAccount(token);

//   return (
//     <>
//       <ActivityDetail
//       token={token}
//       accountData= {accountData}
      
//       />
//     </>
//   );
// };

// export default ActivityDetailPage;

import ActivityDetailClient from "@/components/dashboard/activity/ActivityDetailClient";

export default function ActivityDetailPage() {
  return <ActivityDetailClient />;
}
