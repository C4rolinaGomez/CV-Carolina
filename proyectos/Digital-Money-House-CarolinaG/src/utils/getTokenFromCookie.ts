import { cookies } from 'next/headers';

// export function getTokenFromCookie() {
//   return cookies().get('authToken')?.value || '';
// }
// getTokenFromCookie.ts

export async function getTokenFromCookie() {
  const cookieStore = await cookies();
  return cookieStore.get('authToken')?.value || '';
}
