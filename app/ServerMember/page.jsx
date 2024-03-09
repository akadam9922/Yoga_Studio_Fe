import { getServerSession } from "next-auth";
import {options} from "../api/auth/[...nextauth]/options"
import { redirect } from "next/navigation";

const MemberServerSide = async () => {
    const session = await getServerSession(options);

    if(!session){
        redirect("/api/auth/signin?callbackUrl=/ServerMember");
        
    }


  return (
    <>
    <h1>MemberServerSide</h1>
    <p>{session?.user?.userID}</p>
    <p>{session?.user?.userType}</p>

    
    </>
  )
}

export default MemberServerSide