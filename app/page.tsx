import {auth} from '@/auth'
import {headers} from 'next/headers'
export default async function Home() {
  const session = await auth.api.getSession({
    headers:await headers()
  })
  return (
   <div className="">
    <h1 className='text-lg'>{session?.user.email}</h1>
   </div>
  );
}
